import { Routes } from '@angular/router';
import { seguridadGuard } from './guard/seguridad-guard';

import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rutascomponent } from './components/rutascomponent/rutascomponent';
import { UsuarioInsert } from './components/usuariocomponent/usuario-insert/usuario-insert';
import { Authenticate } from './components/authenticate/authenticate';

import { Locationcomponent } from './components/locationcomponent/locationcomponent';
import { LocationList } from './components/locationcomponent/location-list/location-list';
import { LocationInsert } from './components/locationcomponent/location-insert/location-insert';
import { LocationUpdate } from './components/locationcomponent/location-update/location-update';
import { LocationSearch } from './components/locationcomponent/location-search/location-search';

import { Materialcomponent } from './components/materialcomponent/materialcomponent';
import { MaterialList } from './components/materialcomponent/material-list/material-list';
import { MaterialInsert } from './components/materialcomponent/material-insert/material-insert';
import { MaterialUpdate } from './components/materialcomponent/material-update/material-update';
import { MaterialSearch } from './components/materialcomponent/material-search/material-search';

import { Categorycomponent } from './components/categorycomponent/categorycomponent';
import { CategoryList } from './components/categorycomponent/category-list/category-list';
import { CategoryInsert } from './components/categorycomponent/category-insert/category-insert';
import { CategoryUpdate } from './components/categorycomponent/category-update/category-update';
import { CategorySearch } from './components/categorycomponent/category-search/category-search';

import { Collectionpointcomponent } from './components/collectionpointcomponent/collectionpointcomponent';
import { CollectionpointList } from './components/collectionpointcomponent/collectionpoint-list/collectionpoint-list';
import { CollectionpointInsert } from './components/collectionpointcomponent/collectionpoint-insert/collectionpoint-insert';
import { CollectionpointUpdate } from './components/collectionpointcomponent/collectionpoint-update/collectionpoint-update';
import { CollectionpointSearch } from './components/collectionpointcomponent/collectionpoint-search/collectionpoint-search';

import { Itemcomponent } from './components/itemcomponent/itemcomponent';
import { ItemList } from './components/itemcomponent/item-list/item-list';
import { ItemInsert } from './components/itemcomponent/item-insert/item-insert';
import { ItemUpdate } from './components/itemcomponent/item-update/item-update';
import { ItemSearch } from './components/itemcomponent/item-search/item-search';

import { Recyclingcomponent } from './components/recyclingcomponent/recyclingcomponent';
import { RecyclingList } from './components/recyclingcomponent/recycling-list/recycling-list';
import { RecyclingInsert } from './components/recyclingcomponent/recycling-insert/recycling-insert';
import { RecyclingUpdate } from './components/recyclingcomponent/recycling-update/recycling-update';
import { RecyclingSearch } from './components/recyclingcomponent/recycling-search/recycling-search';

import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { UsuarioUpdate } from './components/usuariocomponent/usuario-update/usuario-update';
import { UsuarioSearch } from './components/usuariocomponent/usuario-search/usuario-search';

import { Recyclingdetailcomponent } from './components/recyclingdetailcomponent/recyclingdetailcomponent';
import { RecyclingdetailList } from './components/recyclingdetailcomponent/recyclingdetail-list/recyclingdetail-list';
import { RecyclingdetailInsert } from './components/recyclingdetailcomponent/recyclingdetail-insert/recyclingdetail-insert';
import { RecyclingdetailUpdate } from './components/recyclingdetailcomponent/recyclingdetail-update/recyclingdetail-update';
import { RecyclingdetailSearch } from './components/recyclingdetailcomponent/recyclingdetail-search/recyclingdetail-search';

import { ReportItemCategory } from './components/report-item-category/report-item-category';
import { ReportRecyclingUser } from './components/report-recycling-user/report-recycling-user';

import { Report1 } from './components/reports/report1/report1';
import { Report2 } from './components/reports/report2/report2';
import { Dashboard } from './components/reports/dashboard/dashboard';

import { Bartercomponent } from './components/bartercomponent/bartercomponent';
import { BarterList } from './components/bartercomponent/barter-list/barter-list';
import { BarterInsert } from './components/bartercomponent/barter-insert/barter-insert';
import { BarterUpdate } from './components/bartercomponent/barter-update/barter-update';
import { BarterSearch } from './components/bartercomponent/barter-search/barter-search';

import { Donationcomponent } from './components/donationcomponent/donationcomponent';
import { DonationList } from './components/donationcomponent/donation-list/donation-list';
import { DonationInsert } from './components/donationcomponent/donation-insert/donation-insert';
import { DonationSearch } from './components/donationcomponent/donation-search/donation-search';
import { DonationUpdate } from './components/donationcomponent/donation-update/donation-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Authenticate,
  },

  {
    path: 'registro',
    component: UsuarioInsert,
  },

  {
    path: 'homes',
    component: Homecomponent,
  },

  {
    path: 'ruta-cercana',
    component: Rutascomponent,
    canActivate: [seguridadGuard],
  },

  {
    path: 'ubicaciones',
    component: Locationcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: LocationList },
      { path: 'insertar', component: LocationInsert },
      { path: 'edits/:id', component: LocationUpdate },
      { path: 'buscar-id', component: LocationSearch },
    ],
  },

  {
    path: 'materiales',
    component: Materialcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: MaterialList },
      { path: 'insertar', component: MaterialInsert },
      { path: 'edits/:id', component: MaterialUpdate },
      { path: 'buscar-tipo', component: MaterialSearch },
    ],
  },

  {
    path: 'categorias',
    component: Categorycomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: CategoryList },
      { path: 'insertar', component: CategoryInsert },
      { path: 'edits/:id', component: CategoryUpdate },
      { path: 'buscar-id', component: CategorySearch },
    ],
  },

  {
    path: 'puntos-acopio',
    component: Collectionpointcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: CollectionpointList },
      { path: 'insertar', component: CollectionpointInsert },
      { path: 'edits/:id', component: CollectionpointUpdate },
      { path: 'buscar-id', component: CollectionpointSearch },
    ],
  },

  {
    path: 'items',
    component: Itemcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: ItemList },
      { path: 'insertar', component: ItemInsert },
      { path: 'edits/:id', component: ItemUpdate },
      { path: 'buscar-id', component: ItemSearch },
    ],
  },

  {
    path: 'reciclajes',
    component: Recyclingcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: RecyclingList },
      { path: 'insertar', component: RecyclingInsert },
      { path: 'edits/:id', component: RecyclingUpdate },
      { path: 'buscar-id', component: RecyclingSearch },
    ],
  },

  {
    path: 'usuarios',
    component: Usuariocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: UsuarioList },
      { path: 'edits/:id', component: UsuarioUpdate },
      { path: 'buscar-id', component: UsuarioSearch },
    ],
  },

  {
    path: 'detalles-reciclaje',
    component: Recyclingdetailcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: RecyclingdetailList },
      { path: 'insertar', component: RecyclingdetailInsert },
      { path: 'edits/:id', component: RecyclingdetailUpdate },
      { path: 'buscar-id', component: RecyclingdetailSearch },
    ],
  },

  {
    path: 'trueques',
    component: Bartercomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: BarterList },
      { path: 'insertar', component: BarterInsert },
      { path: 'edits/:id', component: BarterUpdate },
      { path: 'buscar-id', component: BarterSearch },
    ],
  },

  {
    path: 'donaciones',
    component: Donationcomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'listar', component: DonationList },
      { path: 'insertar', component: DonationInsert },
      { path: 'buscar', component: DonationSearch },
      { path: 'edits/:id', component: DonationUpdate },
    ],
  },

  {
    path: 'reports',
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'report1', component: Report1 },
      { path: 'report2', component: Report2 },
    ],
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [seguridadGuard],
  },

  {
    path: 'reportes/articulos-categoria',
    component: ReportItemCategory,
    canActivate: [seguridadGuard],
  },

  {
    path: 'reportes/reciclajes-usuario',
    component: ReportRecyclingUser,
    canActivate: [seguridadGuard],
  },
];