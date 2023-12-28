import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("\n----HttpInterceptor----")
    if(this.sessionStorageService.getToken() !== null) {
      console.log("sessionStorageService.getToken(): ", this.sessionStorageService.getToken())
      req = req.clone({
        setHeaders: { 'Authorization': 'Bearer ' + this.sessionStorageService.getToken() }
      });
    }
    console.log("\n\n\n\n")
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];