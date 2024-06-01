import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: async () => await import('./domain/home/home-routes'),
  },
  {
    path: 'login',
    loadChildren: async () => await import('./domain/login/login-routes'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
