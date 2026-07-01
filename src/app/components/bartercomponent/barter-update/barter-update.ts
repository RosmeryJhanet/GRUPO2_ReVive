import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barterservice } from '../../../services/barterservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Barter } from '../../../models/barter';
import { Usuario } from '../../../models/usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-barter-update',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './barter-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './barter-update.css',
})
export class BarterUpdate implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  b: Barter = new Barter();
  id: number = 0;
  listaUsuarios: Usuario[] = [];

  constructor(
    private bS: Barterservice,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.bS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          description: data.descriptionBarter,
          status: data.statusBarter,
          date: data.dateBarter ? new Date(data.dateBarter) : '',
          usuario: data.idUser,
        });
      },
    });
  }

  ngAfterViewInit(): void {
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    });
  }

  private formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  actualizar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.b.idBarter = this.id;
    this.b.descriptionBarter = this.form.value.description;
    this.b.statusBarter = this.form.value.status;
    this.b.dateBarter = this.formatearFecha(this.form.value.date);
    this.b.idUser = this.form.value.usuario;

    this.bS.update(this.b).subscribe({
      next: () => {
        this.snackBar.open('Trueque actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/trueques/listar']);
      },
    });
  }
}
