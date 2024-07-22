import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  FactoryProvider,
  inject,
  isDevMode,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { AppEventsHandleFacade } from '@portifolio/utils/util-app-events-handle';
import { appRoutes } from './app.routes';

export const APP_EVENT_TOKEN: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const appEventsHandle = inject(AppEventsHandleFacade);

    return () => appEventsHandle.startDomain();
  },
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    APP_EVENT_TOKEN,
  ],
};
