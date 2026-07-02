import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http'
import { Material } from '../models/material';
import { QueryNativeMaterialTypeDTO } from '../models/query-native-material-type';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class Materialservice {
  private url = `${base_url}/api/Material`;

  constructor(private http: HttpClient) {}

    list() {
    return this.http.get<Material[]>(`${this.url}/Material`);
  }
  insert(p: Material) {
    return this.http.post(`${this.url}/registrar`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Material>(`${this.url}/${id}`);
  }
  update(m: Material) {
    return this.http.put(`${this.url}/actualizar`, m, { responseType: 'text' });
  }

  searchByType(type: string) {
    return this.http.get<QueryNativeMaterialTypeDTO[]>(`${this.url}/buscartipo`, {
      params: { type },
    });
  }

}
