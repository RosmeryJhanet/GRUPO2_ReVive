import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Location as LocationModel } from '../models/location';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Locationservice {
  private url = `${base_url}/api/location`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<LocationModel[]>(`${this.url}/listar/ubicaciones`);
  }
  insert(l: LocationModel) {
    return this.http.post(`${this.url}/registrar/ubicaciones`, l, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  listId(id:number){
   return this.http.get<LocationModel>(`${this.url}/buscar/${id}`);
  }
  update(l: LocationModel) {
    return this.http.put(`${this.url}/ubicaciones/actualiza`, l, { responseType: 'text' });
  }

}
