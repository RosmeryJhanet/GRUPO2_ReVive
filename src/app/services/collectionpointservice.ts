import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CollectionPoint } from '../models/collectionpoint';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Collectionpointservice {
  private url = `${base_url}/api/Punto-Acopio`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CollectionPoint[]>(`${this.url}/listar`);
  }
  insert(c: CollectionPoint) {
    return this.http.post<CollectionPoint>(`${this.url}/registrar`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<CollectionPoint>(`${this.url}/${id}`);
  }
  update(c: CollectionPoint) {
    return this.http.put(`${this.url}/actualizar`, c, { responseType: 'text' });
  }
}
