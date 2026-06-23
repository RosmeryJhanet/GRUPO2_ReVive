import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChatWidget } from './chat-widget/chat-widget';

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule, MatIconModule, ChatWidget],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {

  members = [
  { name: 'Franco Rafael Muro Gonzalez', initials: 'FM' },
  { name: 'Rosmery Jhanet Pacheco Rodriguez', initials: 'RP' },
  { name: 'Marco Antonio Chavez Loli', initials: 'MC' },
  { name: 'Luis Manuel Ortiz Ramos', initials: 'LO' },
];
}

