import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../models/donation';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Donationservice {

  private url = `${base_url}/api/Donacion`;

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Donation[]>(`${this.url}/listar`);
  }
  insert(d: Donation){
    return this.http.post<Donation>(`${this.url}/registrar`, d);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`, {
      responseType: 'text'
    });
  }
  update(id: number, d: Donation){
    return this.http.put<Donation>(`${this.url}/actualizar/${id}`, d);
  }

}
