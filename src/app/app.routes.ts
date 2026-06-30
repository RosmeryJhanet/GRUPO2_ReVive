import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  
  {
    path: 'homes',
    loadComponent: () => import('./components/homecomponent/homecomponent').then((m) => m.Homecomponent),
  },
  {
    path: 'ruta-cercana',
    loadComponent: () => import('./components/rutascomponent/rutascomponent').then((m) => m.Rutascomponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/usuariocomponent/usuario-insert/usuario-insert').then((m) => m.UsuarioInsert),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/authenticate/authenticate').then((m) => m.Authenticate),
  },
  {
    path: 'ubicaciones',
    loadComponent: () =>
      import('./components/locationcomponent/locationcomponent').then((m) => m.Locationcomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/locationcomponent/location-list/location-list').then((m) => m.LocationList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/locationcomponent/location-insert/location-insert').then((m) => m.LocationInsert),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/locationcomponent/location-update/location-update').then((m) => m.LocationUpdate),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/locationcomponent/location-search/location-search').then((m) => m.LocationSearch),
      },
    ],
  },
  {
    path: 'materiales',
    loadComponent: () =>
      import('./components/materialcomponent/materialcomponent').then((m) => m.Materialcomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/materialcomponent/material-list/material-list').then((m) => m.MaterialList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/materialcomponent/material-insert/material-insert').then((m) => m.MaterialInsert),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/materialcomponent/material-update/material-update').then((m) => m.MaterialUpdate),
      },
      {
        path: 'buscar-tipo',
        loadComponent: () =>
          import('./components/materialcomponent/material-search/material-search').then((m) => m.MaterialSearch),
      },
    ],
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./components/categorycomponent/categorycomponent').then((m) => m.Categorycomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/categorycomponent/category-list/category-list').then((m) => m.CategoryList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/categorycomponent/category-insert/category-insert').then((m) => m.CategoryInsert),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/categorycomponent/category-update/category-update').then((m) => m.CategoryUpdate),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/categorycomponent/category-search/category-search').then((m) => m.CategorySearch),
      },
    ],
  },
  {
    path: 'puntos-acopio',
    loadComponent: () =>
      import('./components/collectionpointcomponent/collectionpointcomponent').then(
        (m) => m.Collectionpointcomponent,
      ),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/collectionpointcomponent/collectionpoint-list/collectionpoint-list').then(
            (m) => m.CollectionpointList,
          ),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/collectionpointcomponent/collectionpoint-insert/collectionpoint-insert').then(
            (m) => m.CollectionpointInsert,
          ),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/collectionpointcomponent/collectionpoint-update/collectionpoint-update').then(
            (m) => m.CollectionpointUpdate,
          ),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/collectionpointcomponent/collectionpoint-search/collectionpoint-search').then(
            (m) => m.CollectionpointSearch,
          ),
      },
    ],
  },
  {
    path: 'items',
    loadComponent: () => import('./components/itemcomponent/itemcomponent').then((m) => m.Itemcomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () => import('./components/itemcomponent/item-list/item-list').then((m) => m.ItemList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/itemcomponent/item-insert/item-insert').then((m) => m.ItemInsert),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/itemcomponent/item-update/item-update').then((m) => m.ItemUpdate),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/itemcomponent/item-search/item-search').then((m) => m.ItemSearch),
      },
    ],
  },
  {
    path: 'reciclajes',
    loadComponent: () =>
      import('./components/recyclingcomponent/recyclingcomponent').then((m) => m.Recyclingcomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/recyclingcomponent/recycling-list/recycling-list').then((m) => m.RecyclingList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/recyclingcomponent/recycling-insert/recycling-insert').then(
            (m) => m.RecyclingInsert,
          ),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/recyclingcomponent/recycling-update/recycling-update').then(
            (m) => m.RecyclingUpdate,
          ),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/recyclingcomponent/recycling-search/recycling-search').then(
            (m) => m.RecyclingSearch,
          ),
      },
    ],
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./components/usuariocomponent/usuariocomponent').then((m) => m.Usuariocomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/usuariocomponent/usuario-list/usuario-list').then((m) => m.UsuarioList),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/usuariocomponent/usuario-update/usuario-update').then((m) => m.UsuarioUpdate),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/usuariocomponent/usuario-search/usuario-search').then((m) => m.UsuarioSearch),
      },
    ],
  },
  {
    path: 'detalles-reciclaje',
    loadComponent: () =>
      import('./components/recyclingdetailcomponent/recyclingdetailcomponent').then(
        (m) => m.Recyclingdetailcomponent,
      ),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/recyclingdetailcomponent/recyclingdetail-list/recyclingdetail-list').then(
            (m) => m.RecyclingdetailList,
          ),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/recyclingdetailcomponent/recyclingdetail-insert/recyclingdetail-insert').then(
            (m) => m.RecyclingdetailInsert,
          ),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/recyclingdetailcomponent/recyclingdetail-update/recyclingdetail-update').then(
            (m) => m.RecyclingdetailUpdate,
          ),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/recyclingdetailcomponent/recyclingdetail-search/recyclingdetail-search').then(
            (m) => m.RecyclingdetailSearch,
          ),
      },
    ],
  },
  {
    path: 'reports',
    children: [
      {
        path: 'report1',
        loadComponent: () => import('./components/reports/report1/report1').then((m) => m.Report1),
      },
      {
        path: 'report2',
        loadComponent: () => import('./components/reports/report2/report2').then((m) => m.Report2),
      },
    ],
  },
  {
    path: 'trueques',
    loadComponent: () => import('./components/bartercomponent/bartercomponent').then((m) => m.Bartercomponent),
    children: [
      {
        path: 'listar',
        loadComponent: () =>
          import('./components/bartercomponent/barter-list/barter-list').then((m) => m.BarterList),
      },
      {
        path: 'insertar',
        loadComponent: () =>
          import('./components/bartercomponent/barter-insert/barter-insert').then((m) => m.BarterInsert),
      },
      {
        path: 'edits/:id',
        loadComponent: () =>
          import('./components/bartercomponent/barter-update/barter-update').then((m) => m.BarterUpdate),
      },
      {
        path: 'buscar-id',
        loadComponent: () =>
          import('./components/bartercomponent/barter-search/barter-search').then((m) => m.BarterSearch),
      },
    ],
  },
];
