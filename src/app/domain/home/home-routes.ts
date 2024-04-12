import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./home-page/home-page.component')).HomePageComponent,

    children: [
      {
        path: '',
        loadChildren: async () => await import('../workspace/workspace-routes'),
      },
    ],
  },
] as Routes;
