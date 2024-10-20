import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [    
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),    
    AuthService,
    {
      provide: StorageService,
      useClass: StorageService
    },
    {
      provide: Storage,
      useClass: Storage
    }
  ]
};
