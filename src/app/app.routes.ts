import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'system',
    loadChildren: () => import('./system/system.routes')
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
