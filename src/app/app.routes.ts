import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Materialcomponent } from './components/materialcomponent/materialcomponent';
import { MaterialList } from './components/materialcomponent/material-list/material-list';
import { MaterialInsert } from './components/materialcomponent/material-insert/material-insert';
import { Locationcomponent } from './components/locationcomponent/locationcomponent';
import { LocationList } from './components/locationcomponent/location-list/location-list';
import { LocationInsert } from './components/locationcomponent/location-insert/location-insert';
import { Categorycomponent } from './components/categorycomponent/categorycomponent';
import { CategoryInsert } from './components/categorycomponent/category-insert/category-insert';
import { CategoryList } from './components/categorycomponent/category-list/category-list';

export const routes: Routes = [
{
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'homes',
        component: Homecomponent
    },
    {
        path:'materiales',
        component:Materialcomponent,
        children:[
            {
                path:'listar',
                component:MaterialList
            },
            {
                path:'insertar',
                component:MaterialInsert
            }
        ]
    },
    {
        path:'ubicaciones',
        component:Locationcomponent,
        children:[
            {
                path:'listar',
                component:LocationList
            },
            {
                path:'insertar',
                component:LocationInsert          
            }
        ]
    },
    {
  path: 'categorias',
  component: Categorycomponent,
  children: [
    {
      path: 'insertar',
      component: CategoryInsert
    },
    {
      path: 'listar',
      component: CategoryList
    }
  ]
}
];
