import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./home-page/home-page.component')).HomePageComponent,
  },
] as Routes;
