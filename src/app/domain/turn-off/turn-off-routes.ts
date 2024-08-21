import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./turn-off-page/turn-off-page.component'))
        .TurnOffPageComponent,
  },
] as Routes;
