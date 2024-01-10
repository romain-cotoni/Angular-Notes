import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable              } from '@angular/core';
import { Observable              } from 'rxjs';
import { Note                    } from '../models/note';
import { NoteShared              } from '../models/note-shared';
import { environment             } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + '/note/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  selectedNote: Note | null = null;

  constructor(private httpClient: HttpClient) { }


  getNotes(): Observable<Note[]> {
    const url = BASE_URL + 'all';
    return this.httpClient.get<Note[]>(url);
  }


  getNotesbyUserId(userId: string): Observable<Note[]> {
    const url = BASE_URL + 'user/' + userId;
    return this.httpClient.get<Note[]>(url);
  }


  getNote(noteId: string): Observable<Note> {
    const url = BASE_URL + noteId;
    return this.httpClient.get<Note>(url);
  }


  createNote(userId: number, note: Note): Observable<Note> {
    const url = BASE_URL + 'user/'+ userId.toString() + '/create_note';
    return this.httpClient.post<Note>(url, note, httpOptions);
  }


  updateNote(note: Note): Observable<Note> {
    const url = BASE_URL + 'update_note/' + note.id;
    return this.httpClient.put<Note>(url, note, httpOptions)
  }


  deleteNote(noteId: number) {
    const url = BASE_URL + 'delete_note/' + noteId.toString();
    return this.httpClient.delete(url, httpOptions);
  }


  getSelectedNote() {
    return this.selectedNote;
  }


  setSelectedNote(selectedNote: Note) {
    this.selectedNote = selectedNote;
  }


  deleteSelectedNote() {
    this.selectedNote = null;
  }


  shareNote(noteShared: NoteShared): Observable<NoteShared> {
    const url = BASE_URL + 'share_note';
    return this.httpClient.post<NoteShared>(url, noteShared, httpOptions);
  }
  

  unshareNote(noteShared: NoteShared): Observable<NoteShared> {
    const url = BASE_URL + 'unshare_note';
    return this.httpClient.post<NoteShared>(url, noteShared, httpOptions);
  }


  getSharedNoteUsers(id_note: number): Observable<NoteShared> {
    const url = BASE_URL + 'getSharedNoteAccounts/' + id_note;
    return this.httpClient.get<NoteShared>(url);
  }
  

}