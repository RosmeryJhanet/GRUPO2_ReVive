import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Barter } from '../../../models/barter';
import { Usuario } from '../../../models/usuario';
import { Barterservice } from '../../../services/barterservice';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-barter-insert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './barter-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './barter-insert.css',
})
export class BarterInsert implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  b: Barter = new Barter();
  listaUsuarios: Usuario[] = [];
  imagenPreview: string = '';
  imagenBase64: string = '';

  constructor(
    private bS: Barterservice,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      status: [true],
      date: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
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

  private formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const archivo = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const resultado = reader.result as string;
      this.imagenPreview = resultado;
      this.imagenBase64 = resultado;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(archivo);
  }

  quitarImagen(): void {
    this.imagenPreview = '';
    this.imagenBase64 = '';
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.b.descriptionBarter = this.form.value.description;
    this.b.statusBarter = this.form.value.status;
    this.b.dateBarter = this.formatearFecha(this.form.value.date);
    this.b.idUser = this.form.value.usuario;
    this.b.imageBarter = this.imagenBase64;

    this.bS.insert(this.b).subscribe({
      next: () => {
        this.snackBar.open('Trueque registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/trueques/listar']);
      },
      error: (err) => {
        this.snackBar.open(err.error ?? 'No se pudo registrar el trueque', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
