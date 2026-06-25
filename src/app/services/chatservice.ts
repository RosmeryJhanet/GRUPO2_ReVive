import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { GEMINI_API_KEY } from '../../environments/gemini-key';
import { ChatMessage } from '../models/chat-message';

const SYSTEM_PROMPT = `Eres el asistente virtual de ReVive, una aplicación de reciclaje y puntos de recolección en Lima, Perú.
Tu única función es responder preguntas sobre reciclaje, clasificación de materiales reciclables (plástico, vidrio, papel, metal, cartón), cuidado del medio ambiente y el uso de la app ReVive.
Si te preguntan algo que no esté relacionado con reciclaje o medio ambiente, responde amablemente que solo puedes ayudar con temas de reciclaje.
Responde siempre en español, de forma breve y clara.`;

@Injectable({
  providedIn: 'root',
})
export class Chatservice {
  private url = `https://generativelanguage.googleapis.com/v1beta/models/${environment.geminiModel}:generateContent`;

  constructor(private http: HttpClient) {}

  enviarMensaje(historial: ChatMessage[]) {
    const body = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: historial.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    };
    return this.http.post<any>(`${this.url}?key=${GEMINI_API_KEY}`, body);
  }
}
