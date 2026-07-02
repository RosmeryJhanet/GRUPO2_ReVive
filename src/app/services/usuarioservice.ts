import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/api/usuario`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/usuarios/listar`);
  }
  insert(u: Usuario) {
    return this.http.post<Usuario>(`${this.url}/registrar/usuarios`, u);
  }
  update(u: Usuario) {
    return this.http.put(`${this.url}/usuarios/actualizar`, u, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/buscar/${id}`);
  }
}
