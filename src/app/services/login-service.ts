import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtRequestDTO } from "../models/JwtRequestDTO";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment.development";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  login(request: JwtRequestDTO) {
    return this.http.post(`${base_url}/api/auth/login`, request);
  }
  verificar() {
    if (!this.isBrowser()) return false;
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    if (!this.isBrowser()) return null;
    let token = sessionStorage.getItem('token');
    if (!token) return null;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    console.log(decodedToken);
    return decodedToken?.roles || null;
  }

  tieneRol(nombre: string): boolean {
    const role = this.showRole();
    if (Array.isArray(role)) return role.includes(nombre);
    return role === nombre;
  }

  getInfoUsuario(): { email: string; rol: string } | null {
    if (!this.isBrowser()) return null;
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    if (!decoded) return null;
    const rol = Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles;
    return {
      email: decoded.sub || decoded.email || '',
      rol: rol || '',
    };
  }

  cargarUsuarios() {
    return this.http.get<any[]>(`${base_url}/api/usuario/usuarios/listar`);
  }

  getPerfilUsuario(): any | null {
    if (!this.isBrowser()) return null;
    const stored = sessionStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  }

}