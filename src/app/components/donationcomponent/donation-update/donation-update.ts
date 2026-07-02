import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-donation-update',
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
  templateUrl: './donation-update.html',
  styleUrl: './donation-update.css',
})
export class DonationUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  donation: DonationDTO = new DonationDTO();
  id: number = 0;

  listaItems: ItemDTO[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private dS: Donationservice,
    private iS: ItemService,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameDonation: ['', [Validators.required, Validators.maxLength(50)]],
      itemId: ['', Validators.required],
      idUser: ['', Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.iS.list().subscribe((data) => {
      this.listaItems = data;
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.dS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          nameDonation: data.nameDonation,
          itemId: data.itemId,
          idUser: data.idUser,
        });
      },
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.donation.idDonation = this.id;
    this.donation.nameDonation = this.form.value.nameDonation;
    this.donation.itemId = this.form.value.itemId;
    this.donation.idUser = this.form.value.idUser;

    this.dS.update(this.donation).subscribe({
      next: () => {
        this.snackBar.open('Donación actualizada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/donaciones/listar']);
      },
    });
  }
}