import { Route } from '@angular/router';
import { AVAILABLE_ROUTES } from '@portifolio/utils/util-routes';

export const appRoutes: Route[] = [
  {
    path: AVAILABLE_ROUTES.HOME,
    loadChildren: async () => await import('./domain/home/home-routes'),
  },
  {
    path: AVAILABLE_ROUTES.LOGIN,
    loadChildren: async () => await import('./domain/login/login-routes'),
  },
  {
    path: AVAILABLE_ROUTES.TURN_OFF,
    loadChildren: async () => await import('./domain/turn-off/turn-off-routes'),
  },
  {
    path: '',
    redirectTo: AVAILABLE_ROUTES.LOGIN,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: AVAILABLE_ROUTES.LOGIN,
    pathMatch: 'full',
  },
];
