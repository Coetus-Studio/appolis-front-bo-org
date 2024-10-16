import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';


export const appConfig: ApplicationConfig = {
  providers: [    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {
      provide: HttpClient,
      useValue: HttpClient
    },
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
