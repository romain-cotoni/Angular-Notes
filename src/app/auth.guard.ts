import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './services/session-storage.service';

export const authGuard = () => {
  const sessionStorageService = inject(SessionStorageService);
  const router = inject(Router);
  console.log("authGuard");
  if (sessionStorageService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login'); // Redirect to the login page if not signed in
};