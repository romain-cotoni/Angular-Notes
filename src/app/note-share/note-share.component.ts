import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NoteService } from '../services/note.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Note } from '../models/note';
import { Right } from '../enums/right';
import { MatSelectChange } from '@angular/material/select';
import { UserShared } from '../models/user-shared';
//import { NoteShared } from '../models/model-tests';
import { NoteShared } from '../models/note-shared';

@Component({
  selector: 'app-note-share',
  templateUrl: './note-share.component.html',
  styleUrls: ['./note-share.component.scss']
})
export class NoteShareComponent {

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  userControl = new FormControl('');
  chipUsers: string[] = [];
  filteredUsersOptions: Observable<User[]> = of([]);
  sharedUsers: UserShared[] = [];

  right = Right;
  selectedRight: Right = Right.READ;
  deletable: boolean = false;
  
  user!: User;
  selectedNote!: Note;
  noteTitle: string = "";
  noteId!: number;
  
  
  constructor(private noteService: NoteService,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) {}


  ngOnInit() {
    //GET THE USER AUTHENTICATED
    this.user = this.userService.getCurrentUser() || this.sessionStorageService.getUser();
    
    //GET SELECTED NOTE
    this.selectedNote = (this.noteService.getSelectedNote() || this.sessionStorageService.getSelectedNote()) as Note;
    
    //GET NOTE TITLE
    this.noteTitle = this.selectedNote.title as string;

    //GET NOTE ID
    this.noteId = this.selectedNote?.id as number;

    //GET THE USERS FOR FILTER & SELECT
    this.filteredUsersOptions = this.userControl.valueChanges.pipe(
      distinctUntilChanged(),
      filter(value => value != null && typeof value === 'string' && value.trim() !== ''),
      switchMap(value => { return this.userService.searchUsersByUsernameByString(value as string) } )
    )

    //GET LIST OF ALL USERS FOR FILTER SEARCH INPUT (FOR SHARING SELECTED NOTE)
    this.getAllUsersAssociatedToSelectedNote(this.noteId);
    console.log("sharedUsers: ",this.sharedUsers);
    

  }


  onUserOptionsSelectionChanged(event: any) {
    let value = event.option.viewValue;
    if(this.chipUsers.find(chipuser => chipuser === value)) return
    this.chipUsers.push(value);
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
  }
  

  displayOptionUser(user: User): string {
    return user ? user.username as string : '';
  }
    

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) { this.chipUsers.push(value); }

    event.chipInput!.clear();
    this.userControl.setValue(null);
  }
  

  removeChip(shareduser: string): void {
    const index = this.chipUsers.indexOf(shareduser);

    if(index >= 0) {
      this.chipUsers.splice(index, 1);
    }
  }


  onRightOptionsSelectionChanged(event: MatSelectChange) {
    this.selectedRight = event.value;
  }


  shareNote() {
    let noteShared: NoteShared = {};
    noteShared.id = this.noteId;
    noteShared.right = this.selectedRight;
    let sharedUsers: UserShared[] = [];
    this.chipUsers.forEach(chipUser => {
      let userShared: UserShared = {};
      userShared.username = chipUser;
      userShared.right = this.selectedRight;
      sharedUsers.push(userShared);
    })
    noteShared.sharedUsers = sharedUsers;
    this.noteService.shareNote(noteShared).subscribe({
      next : (response) => { this.sharedUsers = response.sharedUsers as UserShared[];
                             this.chipUsers = []; },
      error: (error)    => { console.log("Error -> From shareNote(): ", error);
                             this.chipUsers = []; },
    })
  }


  // unshareNote(userToUnshare?: string) {
  //   this.noteService.unshareNote(userToUnshare as string, this.noteId).subscribe({
  //     next : ()      => { let index = this.sharedUsers.findIndex(user => user.username === userToUnshare);
  //                         this.sharedUsers.splice(index, 1); },
  //     error: (error) => { console.log("Error -> from unshareNote(): ", error) },
  //   })
  // }

  unshareNote(username?: string) {
    let noteShared: NoteShared = {};
    let usersShared: UserShared[] = [];
    let userShared: UserShared = {};
    noteShared.id = this.noteId;
    userShared.username = username;
    usersShared.push(userShared);
    noteShared.sharedUsers = usersShared;
    this.noteService.unshareNote(noteShared).subscribe({
      next : (response) => { this.sharedUsers = response.sharedUsers as UserShared[]; },
      error: (error)    => { console.log("Error -> from unshareNote(): ", error); },
    })
  }


  getAllUsersAssociatedToSelectedNote(noteId: number) {
    this.noteService.getSharedNoteUsers(noteId).subscribe({
      next: (response) => { this.sharedUsers = response.sharedUsers as UserShared[] },
      error: (error) => { console.log("Error -> from getSharedNoteUsers: ", error) },
    })
  }


  
}
