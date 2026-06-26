import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-update',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './usuario-update.html',
  styleUrl: './usuario-update.css',
})
export class UsuarioUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  u: Usuario = new Usuario();
  id: number = 0;

  constructor(
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      lastName: ['', [Validators.required, Validators.maxLength(200)]],
      document: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.uS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.userName,
          lastName: data.userLastName,
          document: data.userIdentityDocument,
          email: data.userEmail,
        });
      },
    });
  }

  actualizar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.u.idUser = this.id;
    this.u.userName = this.form.value.name;
    this.u.userLastName = this.form.value.lastName;
    this.u.userIdentityDocument = this.form.value.document;
    this.u.userEmail = this.form.value.email;

    this.uS.update(this.u).subscribe({
      next: () => {
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios/listar']);
      },
    });
  }
}
