import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const BASE_URL = 'http://localhost:8080/api/account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}
  
  register(account: User): Observable<any> {
    return this.httpClient.post<any>(BASE_URL + 'register', account, httpOptions);
  }
  
  login(account: User): Observable<any> {
    return this.httpClient.post<any>(BASE_URL + 'login', account, httpOptions);
  }

  logout(): Observable<any> {
    return this.httpClient.get(BASE_URL + 'logout');
  }

}
