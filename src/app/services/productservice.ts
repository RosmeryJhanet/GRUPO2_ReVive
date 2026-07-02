import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '../models/productDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private url = `${base_url}/api/producto`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ProductDTO[]>(`${this.url}/listar`);
  }
  insert(p: ProductDTO) {
    return this.http.post<ProductDTO>(`${this.url}/registrar`, p);
  }
  update(id: number, p: ProductDTO) {
    return this.http.put<ProductDTO>(`${this.url}/${id}`, p);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<ProductDTO>(`${this.url}/${id}`);
  }
}
