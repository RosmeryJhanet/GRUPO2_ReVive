import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class Chatservice {
  private url = '/api/chat';

  constructor(private http: HttpClient) {}

  enviarMensaje(historial: ChatMessage[]) {
    return this.http.post<any>(this.url, { historial });
  }
}
