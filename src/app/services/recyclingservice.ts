import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RecyclingDTO } from '../models/recyclingDTO';
import { QueryNative2DTO } from '../models/queryNative2DTO';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
providedIn: 'root'
})
export class RecyclingService {

private url = `${base_url}/api/Recycling`;

constructor(private http: HttpClient) {}

list() {
return this.http.get<RecyclingDTO[]>(`${this.url}/listar/reciclajes`);
}

insert(r: RecyclingDTO) {
return this.http.post<RecyclingDTO>(`${this.url}/registrar`, r);
}

delete(id: number) {
return this.http.delete(`${this.url}/eliminar/${id}`, {
responseType: 'text'
});
}

update(r: RecyclingDTO) {
return this.http.put(`${this.url}/actualizar`, r, {
responseType: 'text'
});
}

listId(id: number) {
return this.http.get<RecyclingDTO>(`${this.url}/buscar/${id}`);
}

getQuantityByUser(): Observable<QueryNative2DTO[]> {
  return this.http.get<QueryNative2DTO[]>(
    `${this.url}/cantidad-Reciclajes-Usuario`
  );
}
}
