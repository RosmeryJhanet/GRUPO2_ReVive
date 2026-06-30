import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  role: any = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  estaLogueado(): boolean {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
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
