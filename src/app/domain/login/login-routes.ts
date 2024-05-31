import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./login-page/login-page.component')).LoginPageComponent,
  },
] as Routes;
