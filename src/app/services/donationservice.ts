import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DonationDTO } from '../models/donationDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Donationservice {
  private url = `${base_url}/api/Donacion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<DonationDTO[]>(`${this.url}/listar`);
  }

  insert(d: DonationDTO) {
    return this.http.post<DonationDTO>(`${this.url}/Registrar`, d);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }

  update(d: DonationDTO) {
    return this.http.put(`${this.url}/actualizar`, d, {
      responseType: 'text',
    });
  }

  listId(id: number) {
    return this.http.get<DonationDTO>(`${this.url}/${id}`);
  }
}