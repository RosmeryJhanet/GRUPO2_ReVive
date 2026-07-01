import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { QueryNativeUserDTO } from '../models/QueryNativeUserDTO';
import { BarterWithUserDTO } from '../models/BarterWithUserDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Reportservice {
  private urlUsuario = `${base_url}/api/usuario`;
  private urlBarter = `${base_url}/api/trueque`;
  constructor(private http: HttpClient) {}

  usuariosSinTrueque() {
    return this.http.get<QueryNativeUserDTO[]>(`${this.urlUsuario}/lista-usuarios-trueque`);
  }

  cantidadTruequesPorUsuario() {
    return this.http.get<BarterWithUserDTO[]>(`${this.urlBarter}/lista-usuarios-cantidad-trueque`);
  }
}
