import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authenticate',
  imports: [FormsModule, RouterLink],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  useremail: string = '';
  userpassword: string = '';
  mensaje: string = '';
  ngOnInit(): void { }

  login() {
    let request = new JwtRequestDTO();
    request.userEmail = this.useremail;
    request.userPassword = this.userpassword;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.redirigirSegunRol();
      },
      (error) => {
        this.snackBar.open(error.error ?? 'Credenciales incorrectas', 'Cerrar', { duration: 3000 });
      }
    );
  }

  olvideContrasena() {
    this.snackBar.open('Próximamente disponible', 'Cerrar', { duration: 2500 });
  }

  private redirigirSegunRol() {
    if (this.loginService.tieneRol('ADMIN')) {
      this.router.navigate(['/usuarios/listar']);
    } else if (this.loginService.tieneRol('TRUEQUERO')) {
      this.router.navigate(['/trueques/listar']);
    } else if (this.loginService.tieneRol('RECOLECTOR')) {
      this.router.navigate(['/ubicaciones/listar']);
    } else {
      this.router.navigate(['/homes']);
    }
  }
}
