import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { environment } from './environments/environment.development';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const CHAT_SYSTEM_PROMPT = `Eres el asistente virtual de ReVive, una aplicación de reciclaje y puntos de recolección en Lima, Perú.
Tu única función es responder preguntas sobre reciclaje, clasificación de materiales reciclables (plástico, vidrio, papel, metal, cartón), cuidado del medio ambiente y el uso de la app ReVive.
Si te preguntan algo que no esté relacionado con reciclaje o medio ambiente, responde amablemente que solo puedes ayudar con temas de reciclaje.
Responde siempre en español, de forma breve y clara.`;

app.use(express.json());

/**
 * Proxy hacia la API de Gemini: la API key vive solo en el servidor
 * (variable de entorno GEMINI_API_KEY) y nunca llega al navegador.
 */
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env['GEMINI_API_KEY'] ?? environment.genimiKey;

  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY no configurada en el servidor.' });
    return;
  }

  const historial: { role: string; text: string }[] = req.body?.historial ?? [];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${environment.geminiModel}:generateContent?key=${apiKey}`;
  const body = {
    systemInstruction: { parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    contents: historial.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
  };

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await geminiRes.json();
    res.status(geminiRes.status).json(data);
  } catch {
    res.status(502).json({ error: 'No se pudo conectar con el servicio de chat.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
