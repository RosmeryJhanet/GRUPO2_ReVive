import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Materialcomponent } from './components/materialcomponent/materialcomponent';
import { MaterialList } from './components/materialcomponent/material-list/material-list';
import { MaterialInsert } from './components/materialcomponent/material-insert/material-insert';
import { Locationcomponent } from './components/locationcomponent/locationcomponent';
import { LocationList } from './components/locationcomponent/location-list/location-list';
import { LocationInsert } from './components/locationcomponent/location-insert/location-insert';
import { LocationUpdate } from './components/locationcomponent/location-update/location-update';
import { LocationSearch } from './components/locationcomponent/location-search/location-search';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  {
    path: 'homes',
    component: Homecomponent,
  },
  {
    path: 'ubicaciones',
    component: Locationcomponent,
    children: [
      {
        path: 'listar',
        component: LocationList,
      },
      {
        path: 'insertar',
        component: LocationInsert,
      },
      {
        path: 'edits/:id',
        component: LocationUpdate,
      },
      {
        path: 'buscar-id',
        component:LocationSearch,
      },
    ],
  },
];
