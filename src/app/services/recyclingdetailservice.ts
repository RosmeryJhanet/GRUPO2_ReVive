import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RecyclingDetailDTO } from '../models/recyclingDetailDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecyclingDetailService {

  private url = `${base_url}/api/DetallesReciclaje`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RecyclingDetailDTO[]>(
      `${this.url}/DetallesReciclajes`
    );
  }

  insert(r: RecyclingDetailDTO) {
    return this.http.post<RecyclingDetailDTO>(
      `${this.url}/registrar`,
      r
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.url}/${id}`,
      {
        responseType: 'text'
      }
    );
  }

  update(r: RecyclingDetailDTO) {
    return this.http.put(
      `${this.url}/actualizar`,
      r,
      {
        responseType: 'text'
      }
    );
  }

  listId(id: number) {
    return this.http.get<RecyclingDetailDTO>(
      `${this.url}/buscar/${id}`
    );
  }
}