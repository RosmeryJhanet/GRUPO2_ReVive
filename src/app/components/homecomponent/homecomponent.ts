import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule, Chatiacomponent],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
  @ViewChild(Chatiacomponent) chat!: Chatiacomponent;

  members = [
    { name: 'Franco Rafael Muro Gonzalez', initials: 'FM' },
    { name: 'Rosmery Jhanet Pacheco Rodriguez', initials: 'RP' },
    { name: 'Marco Antonio Chavez Loli', initials: 'MC' },
    { name: 'Luis Manuel Ortiz Ramos', initials: 'LO' },
  ];

  constructor(private snackBar: MatSnackBar) {}

  proximamente() {
    this.snackBar.open('Próximamente disponible', 'Cerrar', { duration: 2500 });
  }

  abrirChat() {
    this.chat.abrir();
  }
}

