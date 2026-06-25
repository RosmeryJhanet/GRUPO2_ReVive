import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Materialcomponent } from './components/materialcomponent/materialcomponent';
import { MaterialList } from './components/materialcomponent/material-list/material-list';
import { MaterialInsert } from './components/materialcomponent/material-insert/material-insert';
import { MaterialUpdate } from './components/materialcomponent/material-update/material-update';
import { MaterialSearch } from './components/materialcomponent/material-search/material-search';
import { Locationcomponent } from './components/locationcomponent/locationcomponent';
import { LocationList } from './components/locationcomponent/location-list/location-list';
import { LocationInsert } from './components/locationcomponent/location-insert/location-insert';
import { LocationUpdate } from './components/locationcomponent/location-update/location-update';
import { LocationSearch } from './components/locationcomponent/location-search/location-search';
import { Categorycomponent } from './components/categorycomponent/categorycomponent';
import { CategoryList } from './components/categorycomponent/category-list/category-list';
import { CategoryInsert } from './components/categorycomponent/category-insert/category-insert';
import { CategoryUpdate } from './components/categorycomponent/category-update/category-update';
import { CategorySearch } from './components/categorycomponent/category-search/category-search';
import { Rutascomponent } from './components/rutascomponent/rutascomponent';
import { Collectionpointcomponent } from './components/collectionpointcomponent/collectionpointcomponent';
import { CollectionpointList } from './components/collectionpointcomponent/collectionpoint-list/collectionpoint-list';
import { CollectionpointInsert } from './components/collectionpointcomponent/collectionpoint-insert/collectionpoint-insert';
import { CollectionpointUpdate } from './components/collectionpointcomponent/collectionpoint-update/collectionpoint-update';
import { CollectionpointSearch } from './components/collectionpointcomponent/collectionpoint-search/collectionpoint-search';

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
    path: 'ruta-cercana',
    component: Rutascomponent,
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
  {
    path: 'materiales',
    component: Materialcomponent,
    children: [
      {
        path: 'listar',
        component: MaterialList,
      },
      {
        path: 'insertar',
        component: MaterialInsert,
      },
      {
        path: 'edits/:id',
        component: MaterialUpdate,
      },
      {
        path: 'buscar-tipo',
        component: MaterialSearch,
      },
    ],
  },
  {
    path: 'categorias',
    component: Categorycomponent,
    children: [
      {
        path: 'listar',
        component: CategoryList,
      },
      {
        path: 'insertar',
        component: CategoryInsert,
      },
      {
        path: 'edits/:id',
        component: CategoryUpdate,
      },
      {
        path: 'buscar-id',
        component: CategorySearch,
      },
    ],
  },
  {
    path: 'puntos-acopio',
    component: Collectionpointcomponent,
    children: [
      {
        path: 'listar',
        component: CollectionpointList,
      },
      {
        path: 'insertar',
        component: CollectionpointInsert,
      },
      {
        path: 'edits/:id',
        component: CollectionpointUpdate,
      },
      {
        path: 'buscar-id',
        component: CollectionpointSearch,
      },
    ],
  },
];
