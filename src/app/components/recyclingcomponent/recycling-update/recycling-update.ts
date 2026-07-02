import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecyclingDTO } from '../../../models/recyclingDTO';
import { Material } from '../../../models/material';
import { Usuario } from '../../../models/usuario';

import { RecyclingService } from '../../../services/recyclingservice';
import { Materialservice } from '../../../services/materialservice';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-recycling-update',
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
  templateUrl: './recycling-update.html',
  styleUrl: './recycling-update.css',
})
export class RecyclingUpdate implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  recycling: RecyclingDTO = new RecyclingDTO();
  id: number = 0;

  listaMateriales: Material[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private rS: RecyclingService,
    private mS: Materialservice,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      material: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.rS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.recyclingName,
          material: data.idMaterial,
          usuario: data.idUser,
        });
      },
    });
  }

  ngAfterViewInit(): void {
    this.mS.list().subscribe((data) => {
      this.listaMateriales = data;
      this.cdr.detectChanges();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.recycling.recyclingId = this.id;
    this.recycling.recyclingName = this.form.value.name;
    this.recycling.idMaterial = this.form.value.material;
    this.recycling.idUser = this.form.value.usuario;

    this.rS.update(this.recycling).subscribe({
      next: () => {
        this.snackBar.open('Reciclaje actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/reciclajes/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar reciclaje:', err);
        this.snackBar.open('Error al actualizar reciclaje', 'Cerrar', { duration: 3000 });
      },
    });
  }
}