import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, Chatiacomponent],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
  @ViewChild(Chatiacomponent) chat!: Chatiacomponent;

  aliados = ['Ciudad Saludable', 'Dar es Dar', 'Municipalidad', 'Bomberos del Perú'];

  servicios = [
  { nombre: 'Donaciones', imagen: 'donaciones.jpg' },
  { nombre: 'Trueques', imagen: 'trueques.jpg' },
  { nombre: 'Reciclaje', imagen: 'reciclaje.webp' },
  
];

  categorias = [
    { nombre: 'Ropa', imagen: 'categorias/ropa.avif' },
    { nombre: 'Juguetes', imagen: 'categorias/juguetes.jpg' },
    { nombre: 'Víveres', imagen: 'categorias/viveres.jpg' },
    { nombre: 'Útiles Escolares', imagen: 'categorias/utilesEscolares.jpg' },
    { nombre: 'Libros', imagen: 'categorias/libros.jpg' },
    { nombre: 'Vidrio', imagen: 'categorias/vidrio.jpg' },
    { nombre: 'Cartón', imagen: 'categorias/carton.webp' },
    { nombre: 'Papel', imagen: 'categorias/papel.webp' },
    { nombre: 'Instrumentos', imagen: 'categorias/instrumentos.jpg' },
    { nombre: 'Deportes', imagen: 'categorias/deportes.jpg' },
    { nombre: 'Muebles', imagen: 'categorias/muebles.jpg' },
    { nombre: 'Electrodomésticos', imagen: 'categorias/electrodomesticos.jpg' },
  ];

  

  resenas = [
    {
      nombre: 'Alice Johnson',
      texto: 'Hacer intercambios de objetos con otras personas es muy divertido. Lo recomiendo bastante.',
    },
    { nombre: 'Rob Smith', texto: 'Una maravillosa experiencia donando a organizaciones cercanas a mí.' },
    { nombre: 'Carol White', texto: 'Encantada con la cantidad de materiales reciclables que pude recoger.' },
    { nombre: 'David Brown', texto: 'Superó mis expectativas en cada aspecto.' },
  ];

  members = [
    { name: 'Franco Rafael Muro Gonzalez', initials: 'FM' },
    { name: 'Rosmery Jhanet Pacheco Rodriguez', initials: 'RP' },
    { name: 'Marco Antonio Chavez Loli', initials: 'MC' },
    { name: 'Luis Manuel Ortiz Ramos', initials: 'LO' },
  ];

  infoForm = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    ocupacion: '',
    edad: '',
    aceptaPrivacidad: false,
    aceptaPublicidad: false,
  };

  constructor(private snackBar: MatSnackBar) {}

  proximamente() {
    this.snackBar.open('Próximamente disponible', 'Cerrar', { duration: 2500 });
  }

  abrirChat() {
    this.chat.abrir();
  }

  irASeccion(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  enviarInfo() {
    this.snackBar.open('¡Gracias! Te contactaremos pronto.', 'Cerrar', { duration: 3000 });
    this.infoForm = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      ocupacion: '',
      edad: '',
      aceptaPrivacidad: false,
      aceptaPublicidad: false,
    };
  }
}
