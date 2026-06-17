import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Category } from '../models/category';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${base_url}/api/Categoria`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Category[]>(`${this.url}/listar/categorias`);
  }

  insert(c: Category) {
    return this.http.post<Category>(`${this.url}/registrar`, c);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, {
      responseType: 'text'
    });
  }

  update(c: Category) {
    return this.http.put(`${this.url}/actualizar`, c, {
      responseType: 'text'
    });
  }

  listId(id: number) {
    return this.http.get<Category>(`${this.url}/${id}`);
  }
}