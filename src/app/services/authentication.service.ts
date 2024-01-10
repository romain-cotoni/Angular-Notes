import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/account/';

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
