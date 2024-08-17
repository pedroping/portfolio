import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  FactoryProvider,
  inject,
  isDevMode,
  Provider,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  PUBLIC_KEY,
  SERVICE_KEY,
  TEMPLATE_KEY,
} from '@portifolio/features/feature-get-in-touch';
import { AppEventsHandleFacade } from '@portifolio/utils/util-app-events-handle';
import { environment } from 'src/environments/environment';
import { appRoutes } from './app.routes';

const APP_EVENT_TOKEN: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const appEventsHandle = inject(AppEventsHandleFacade);

    return () => appEventsHandle.startDomain();
  },
  multi: true,
};

const EMAIL_KEYS: Provider[] = [
  {
    provide: PUBLIC_KEY,
    useValue: environment.publicKey,
  },
  {
    provide: SERVICE_KEY,
    useValue: environment.serviceKey,
  },
  {
    provide: TEMPLATE_KEY,
    useValue: environment.templateKey,
  },
];

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
    ...EMAIL_KEYS,
  ],
};
