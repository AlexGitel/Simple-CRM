import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"da-notes-e649e",
      "appId":"1:1036928432392:web:191e48c07c7c0d087d94bd",
      "storageBucket":"da-notes-e649e.firebasestorage.app",
      "apiKey":"AIzaSyBlJGw3Oi5isiT8EZm95t1U4-Ap_c_2POo",
      "authDomain":"da-notes-e649e.firebaseapp.com",
      "messagingSenderId":"1036928432392"})), 
      provideFirestore(() => getFirestore())]
};
