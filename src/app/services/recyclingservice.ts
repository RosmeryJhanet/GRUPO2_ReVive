import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RecyclingDTO } from '../models/recyclingDTO';

const base_url = environment.base;

@Injectable({
providedIn: 'root'
})
export class RecyclingService {

private url = `${base_url}/api/Recycling`;

constructor(private http: HttpClient) {}

list() {
return this.http.get<RecyclingDTO[]>(`${this.url}/listar/recycling`);
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
return this.http.get<RecyclingDTO>(`${this.url}/${id}`);
}
}
