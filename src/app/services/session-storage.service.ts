import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Note } from 'src/app/models/note';

const USER_KEY  = 'auth-user';
const TOKEN_KEY = 'auth-token';
const NOTE_KEY  = 'selectedNote'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {}

  public saveToken(token: string): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if(token) { return JSON.parse(token); }
    return null;
  }

  public setUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) { return JSON.parse(user); }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) { return true; }
    return false;
  }

  public setSelectedNote(note: Note): void {
    window.sessionStorage.setItem(NOTE_KEY, JSON.stringify(note));
  }

  public getSelectedNote(): Note | null {
    const note = window.sessionStorage.getItem(NOTE_KEY);
    if(note) { return JSON.parse(note); }
    return null;
  }

  public removeSelectedNote(): void {
    window.sessionStorage.removeItem(NOTE_KEY);
  }

  clear(): void {
    window.sessionStorage.clear();
  }

}
