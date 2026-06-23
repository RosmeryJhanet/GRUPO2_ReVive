import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Chatservice } from '../../../services/chatservice';
import { ChatMessage } from '../../../models/chat-message';

@Component({
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidget {
  abierto = false;
  mensaje = '';
  enviando = false;
  historial: ChatMessage[] = [];

  constructor(
    private chatS: Chatservice,
    private cdr: ChangeDetectorRef,
  ) {}

  toggle() {
    this.abierto = !this.abierto;
  }

  formatear(texto: string): string {
    const escapado = texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escapado.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  enviar() {
    const texto = this.mensaje.trim();
    if (!texto || this.enviando) return;

    this.historial.push({ role: 'user', text: texto });
    this.mensaje = '';
    this.enviando = true;

    this.chatS.enviarMensaje(this.historial).subscribe({
      next: (res) => {
        const respuesta =
          res?.candidates?.[0]?.content?.parts?.[0]?.text ??
          'No pude generar una respuesta. Intenta de nuevo.';
        this.historial.push({ role: 'model', text: respuesta });
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.historial.push({
          role: 'model',
          text: 'Ocurrió un error al conectar con el asistente. Intenta más tarde.',
        });
        this.enviando = false;
        this.cdr.detectChanges();
      },
    });

    this.cdr.detectChanges();
  }
}
