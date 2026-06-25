import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ItemDTO } from '../models/itemDTO';

const base_url = environment.base;

@Injectable({
providedIn: 'root'
})
export class ItemService {

private url = `${base_url}/api/Item`;

constructor(private http: HttpClient) {}

list() {
return this.http.get<ItemDTO[]>(`${this.url}/listar/items`);
}

insert(i: ItemDTO) {
return this.http.post<ItemDTO>(`${this.url}/registrar`, i);
}

delete(id: number) {
return this.http.delete(`${this.url}/eliminar/${id}`, {
responseType: 'text'
});
}

update(i: ItemDTO) {
return this.http.put(`${this.url}/actualizar`, i, {
responseType: 'text'
});
}

listId(id: number) {
return this.http.get<ItemDTO>(`${this.url}/${id}`);
}
}
