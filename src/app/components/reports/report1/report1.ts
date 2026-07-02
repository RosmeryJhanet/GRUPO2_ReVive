import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reportservice } from '../../../services/reportservice';
import { QueryNativeUserDTO } from '../../../models/QueryNativeUserDTO';

@Component({
  selector: 'app-report1',
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './report1.html',
  styleUrl: './report1.css',
})
export class Report1 implements OnInit {
  usuarios: QueryNativeUserDTO[] = [];

  constructor(
    private rS: Reportservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte() {
    this.rS.usuariosSinTrueque().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) this.usuarios = [];
        this.cdr.detectChanges();
      },
    });
  }

  enviarMensaje(email: string) {
    const asunto = encodeURIComponent('ReVive - Notificación');
    const cuerpo = encodeURIComponent('Hola, te contactamos desde ReVive.');
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${asunto}&body=${cuerpo}`, '_blank');
  }

  enviarATodos() {
    const emails = this.usuarios.map(u => u.UserEmail).join(',');
    const asunto = encodeURIComponent('ReVive - Notificación');
    const cuerpo = encodeURIComponent('Hola, te contactamos desde ReVive. Te invitamos a realizar tu primer trueque.');
    window.open(`https://mail.google.com/mail/?view=cm&to=${emails}&su=${asunto}&body=${cuerpo}`, '_blank');
  }
}
