import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuario-insert',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert {
  form: FormGroup;
  u: Usuario = new Usuario();

  constructor(
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(200)]],
        lastName: ['', [Validators.required, Validators.maxLength(200)]],
        document: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        aceptaTerminos: [false, Validators.requiredTrue],
      },
      { validators: this.passwordsCoinciden },
    );
  }

  private passwordsCoinciden(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNoCoinciden: true };
  }

  crearCuenta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.u.userName = this.form.value.name;
    this.u.userLastName = this.form.value.lastName;
    this.u.userIdentityDocument = this.form.value.document;
    this.u.userEmail = this.form.value.email;
    this.u.userPassword = this.form.value.password;

    this.uS.insert(this.u).subscribe({
      next: () => {
        this.snackBar.open('Cuenta creada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/homes']);
      },
      error: (err) => {
        this.snackBar.open(err.error ?? 'No se pudo crear la cuenta', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
