import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./workspace-page/workspace-page.component'))
        .WorkspacePageComponent,
  },
] as Routes;
