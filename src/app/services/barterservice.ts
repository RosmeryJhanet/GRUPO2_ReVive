import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Barter } from '../models/barter';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Barterservice {
  private url = `${base_url}/api/trueque`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Barter[]>(`${this.url}/trueque/listar`);
  }
  insert(b: Barter) {
    return this.http.post(`${this.url}/trueque/registrar`, b, { responseType: 'text' });
  }
  update(b: Barter) {
    return this.http.put(`${this.url}/trueque/actualizar`, b, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Barter>(`${this.url}/buscar/${id}`);
  }
}
