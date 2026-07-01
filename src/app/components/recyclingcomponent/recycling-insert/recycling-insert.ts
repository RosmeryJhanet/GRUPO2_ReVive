import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
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
  selector: 'app-recycling-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './recycling-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './recycling-insert.css',
})
export class RecyclingInsert implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  recycling: RecyclingDTO = new RecyclingDTO();

  listaMateriales: Material[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private rS: RecyclingService,
    private mS: Materialservice,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      material: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.mS.list().subscribe({
      next: (data) => {
        this.listaMateriales = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar materiales:', err);
        this.snackBar.open('No se pudo cargar la lista de materiales', 'Cerrar', { duration: 3000 });
      },
    });

    this.uS.list().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.snackBar.open('No se pudo cargar la lista de usuarios', 'Cerrar', { duration: 3000 });
      },
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.recycling.recyclingName = this.form.value.name;
    this.recycling.idMaterial = this.form.value.material;
    this.recycling.idUser = this.form.value.usuario;

    this.rS.insert(this.recycling).subscribe({
      next: () => {
        this.snackBar.open('Reciclaje registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/reciclajes/listar']);
      },
      error: (err) => {
        console.error('Error al registrar reciclaje:', err);
        this.snackBar.open('Error al registrar reciclaje', 'Cerrar', { duration: 3000 });
      },
    });
  }
}