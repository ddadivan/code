import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, TitleStrategy, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient} from '@angular/common/http';
import {CustomTitleStrategyService} from './shared/services/custom-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideNativeDateAdapter(),
    provideHttpClient(),
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategyService
    }
  ],
};
