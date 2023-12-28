import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user!: User
  
  constructor(private httpClient: HttpClient) {}
  
  getUser(username: string): Observable<User> {
    const url = BASE_URL + username;
    return this.httpClient.get<User>(url);
  }
  
  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  deleteCurrentUser() {
    this.user = {};
  }
  
  searchUsersByUsernameByString(searchStr: string): Observable<User[]> {
    const url = BASE_URL + 'searchUsers/' + searchStr;
    return this.httpClient.get<User[]>(url);
  }

  getAllUsersAssociatedToNote(noteId: number): Observable<User[]> {
    const url = BASE_URL + 'getSharedUsers/' + noteId.toString();
    return this.httpClient.get<User[]>(url);
  }

  // refreshCurrentUser(username: string) {
  //     this.getUser(username).subscribe({ 
  //     next : (response) => { this.user = response 
  //                            console.log("user: ",this.user)},
  //     error: (error)    => { console.log("error: ", error) }
  //   })
  // }

}
