import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DonationDTO } from '../../../models/donationDTO';
import { ItemDTO } from '../../../models/itemDTO';
import { Usuario } from '../../../models/usuario';

import { Donationservice } from '../../../services/donationservice';
import { ItemService } from '../../../services/itemservice';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-donation-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './donation-insert.html',
  styleUrl: './donation-insert.css',
})
export class DonationInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  donation: DonationDTO = new DonationDTO();

  listaItems: ItemDTO[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private dS: Donationservice,
    private iS: ItemService,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameDonation: ['', [Validators.required, Validators.maxLength(50)]],
      itemId: ['', Validators.required],
      idUser: ['', Validators.required],
    });

   this.iS.list().subscribe({
  next: (data) => {
    this.listaItems = data;
  },
  error: (err) => {
    console.error('Error al listar artículos', err);
    this.listaItems = [];
    this.snackBar.open('No se pudieron cargar los artículos', 'Cerrar', {
      duration: 3000,
    });
  },
});

this.uS.list().subscribe({
  next: (data) => {
    this.listaUsuarios = data;
  },
  error: (err) => {
    console.error('Error al listar usuarios', err);
    this.listaUsuarios = [];
    this.snackBar.open('No se pudieron cargar los usuarios', 'Cerrar', {
      duration: 3000,
    });
  },
});
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.donation.nameDonation = this.form.value.nameDonation;
    this.donation.itemId = this.form.value.itemId;
    this.donation.idUser = this.form.value.idUser;

    this.dS.insert(this.donation).subscribe({
      next: () => {
        this.snackBar.open('Donación registrada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/donaciones/listar']);
      },
    });
  }
}