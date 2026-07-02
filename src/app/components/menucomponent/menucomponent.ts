import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  role: any = '';
  perfil: any = null;
  mostrarPerfil = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  estaLogueado(): boolean {
    this.role = this.loginService.showRole();
    this.perfil = this.loginService.getPerfilUsuario();
    return this.loginService.verificar();
  }

  togglePerfil() {
    this.mostrarPerfil = !this.mostrarPerfil;
  }

  cerrarDropdown() {
    this.mostrarPerfil = false;
  }

  isAdmin(): boolean {
    return this.loginService.tieneRol('ADMIN');
  }

  isTruequero(): boolean {
    return this.loginService.tieneRol('TRUEQUERO');
  }

  isRecolector(): boolean {
    return this.loginService.tieneRol('RECOLECTOR');
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/homes']);
  }
}
