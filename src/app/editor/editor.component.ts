import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
// import { ModalData } from 'src/app/core/components/dialog-font/dialog-font.component';
import { ModalData } from 'src/app/dialogs/dialog/dialog.component';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { Observable, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { DialogFontComponent } from 'src/app/dialogs/dialog-font/dialog-font.component';
import { Right } from '../enums/right';
import { NoteShared } from '../models/model-tests';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None // Remove _ngcontent-ng-c type attributes from HTML tags
})
export class EditorComponent {
  UNDO_ICON      = "assets/icons/undo.png";
  REDO_ICON      = "assets/icons/redo.png";
  BOLD_ICON      = "assets/icons/carrot.png"; //bold.png";
  ITALIC_ICON    = "assets/icons/apple.png"; //italic.png";
  UNDERLINE_ICON = "assets/icons/leek.png"; //underline.png";
  LINK_ICON      = "assets/icons/pineapple.png"; //link.png";
  COLOR_ICON     = "assets/icons/broccoli.png"; //color.png";
  HIGHLIGHT_ICON = "assets/icons/cucumber.png"; //highlight.png";
  IMAGE_ICON     = "assets/icons/tomato.png"; //image.png";
  ADD_ICON       = "assets/icons/add.png";
  CHEVRON_DOWN   = "assets/icons/chevron-down.png";
  CHEVRON_UP     = "assets/icons/chevron-up.png";
  SAVE_ICON      = "assets/icons/strawberry.png"; //save.png";
  CLEAR_ICON     = "assets/icons/lemon.png"; //create.png";
  DELETE_ICON    = "assets/icons/basket.png"; //delete.png";
  
  @ViewChild('editableContent') editableContent!: ElementRef;
  @ViewChild('editableTitle') editableTitle!: ElementRef;
  @ViewChild('imgInput') imgInput!: ElementRef;
  @ViewChild('noteAutocomplete') noteAutocomplete!: MatAutocomplete;

  noteControl = new FormControl('');
  filteredNotesOptions: Observable<Note[]> = of([]);
  selectedNote: Note | null = null;
  options: Note[] = [];
  sharedUsers!: User[] | null;
  
  user! : User;
  note! : Note;
  
  editable: boolean = true;
  deletable: boolean = false;
  sharable: boolean = false;
  
  imageWidth: number = 24;
  imageHeight: number = 16;
  
  selectedFontSize: string = '3';
  selectedFontColor!: string;
  selectedFontBackgroundColor!: string;


  constructor(private dialog: MatDialog,
              private renderer: Renderer2,
              private router: Router,
              private noteService: NoteService,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    console.log("----EDITOR COMPONENT----");

    //Get the user authenticated
    this.user = this.userService.getCurrentUser() || this.sessionStorageService.getUser();

    //Print log of user details 
    this.userService.getCurrentUser() 
      ? console.log("\nuser from userService           : ", this.userService.getCurrentUser())
      : console.log("\nuser from sessionStorageService : ", this.sessionStorageService.getUser());

    //Get list of user's notes for filter search input
    this.getFilteredNotesOptions();
  }


  memorizeUser(user: User) {
    this.userService.setCurrentUser(user);
    this.sessionStorageService.setUser(user);
  }


  memorizeSelectedNote(note: Note) {
    this.noteService.setSelectedNote(note);
    this.sessionStorageService.setSelectedNote(note);
  }


  getFilteredNotesOptions() {
    let options = this.user.notes || [];
    this.filteredNotesOptions = this.noteControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string'),
      map(value => options?.filter(option => (option.title as string).toLowerCase().includes(value?.toLowerCase() || '') ))
    );
  }


  onNoteOptionsSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.selectedNote = event.option.value as Note;
    this.memorizeSelectedNote(this.selectedNote);
    this.editable  = this.selectedNote.right === Right.WRITE || this.selectedNote.right === Right.OWNER;
    this.deletable = this.selectedNote.right === Right.OWNER;
    this.sharable  = this.selectedNote.right === Right.OWNER;
    this.displayNote();
    this.clearSearchInput();
  }
  

  displayOptionNote(note: Note): string {
    return note ? note.title as string : '';
  }


  clearNote() {
    this.selectedNote = null;
    this.clearEditorViewer();
    this.clearSearchInput();
    this.editable  = true;
  }
  
  clearEditorViewer() {
    this.renderer.setProperty(this.editableTitle.nativeElement  , "innerText", ""); // SET TITLE VIEW EMPTY
    this.renderer.setProperty(this.editableContent.nativeElement, "innerHTML", ""); // SET CONTENT VIEW EMPTY
  }
  
  clearSearchInput() {
    this.noteControl.reset(''); 
    this.uncheckedAllOptions();
  }
  
  
  uncheckedAllOptions() { 
    this.noteAutocomplete.options.forEach((option) => {
      option.deselect();
    });
  }


  displayNote() {
    //Set title in viewer
    this.renderer.setProperty(this.editableTitle.nativeElement  , "innerText", this.selectedNote?.title);
    //Set content in viewer
    this.renderer.setProperty(this.editableContent.nativeElement, "innerHTML", this.selectedNote?.content);
  }


  saveNote() {
    //IF THE NOTE ALREADY EXIST
    if(this.selectedNote?.id) {
      this.selectedNote.title   = this.editableTitle.nativeElement.innerHTML;
      this.selectedNote.content = this.editableContent.nativeElement.innerHTML;
      this.updateNote(this.selectedNote);
    }
    //IF THE NOTE DOESN'T ALREADY EXIST
    else if(this.user?.id) {
      let note: Note = {
        title  : this.editableTitle.nativeElement.innerHTML,
        content: this.editableContent.nativeElement.innerHTML
      }
      this.createNote(this.user.id, note);
    }
  }


  createNote(userId: number, note: Note) {
    this.noteService.createNote(userId, note).subscribe({
      next: (response) => {
        this.selectedNote = response;
        this.user.notes?.push(this.selectedNote);
        this.memorizeUser(this.user);
      
        //Set title in title viewer
        this.renderer.setProperty(this.editableTitle.nativeElement, "innerText", this.selectedNote?.title);
        
        //Get list of user's notes for filter search input
        this.getFilteredNotesOptions();
      },
      error: (error) => { console.log("Error -> from createNote(): ", error); },
    })
  }
  

  updateNote(note: Note) {
    this.noteService.updateNote(note).subscribe({
      next: () => {
        this.selectedNote!.title   = note.title  ; //Change old title with new title
        this.selectedNote!.content = note.content; //Change old content with new content
        this.noteControl.setValue(note.title as string);
        this.memorizeUser(this.user);
      },
      error: (error) => { console.log("Error -> from updateNote(): ", error); }
    });
  }
  

  deleteNote() {
    if(this.selectedNote && this.selectedNote?.id) {
      this.noteService.deleteNote(this.selectedNote.id).subscribe({
        next: () => {
          let index = this.user.notes?.findIndex(note => note.id === this.selectedNote?.id) as number;
          this.user.notes?.splice(index, 1);
          this.memorizeUser(this.user);
          this.clearNote();
        }, 
        error: (error) => { console.log("Error -> from deleteNote(): ", error); }
      })
    }
  }


  // isOwner(): boolean {
  //   if(!this.selectedNote?.id || !this.user.notes) return false 
  //   let noteToCheck = this.user?.notes?.find(note => note.id === this.selectedNote?.id );
  //   if(noteToCheck?.owner) return true
  //   else return false
  // }

  
  goToNoteShare() {
    if(this.selectedNote?.id) this.router.navigate(['share-note']);
  }


  //SORT & ORDER NOTES

  sortIdDesc() {
    let notes = this.user.notes
    if(notes) notes.sort( (a, b) => {
      if (a.id === undefined) return -1;
      if (b.id === undefined) return -1;
      return b.id - a.id } );
  }

  sortNotesListById(desc: boolean) {
    if(this.user && this.user.notes) {
      this.user.notes.sort( (a, b) => {
        if (a.id === undefined) return -1;
        if (b.id === undefined) return -1;
        if(desc) return b.id - a.id
        else return a.id - b.id
      });
    }
  }


  //RICH TEXT EDITOR COMMANDS

  execCommand(arg1: string, arg2: string = '') {
    document.execCommand(arg1, false, arg2); //DEPRECATED BUT NO BETTER ALTERNATIVE YET
  }

  setBold() {
    this.execCommand("bold");
  }

  setItalic() {
    this.execCommand("italic");
  }

  setUnderline() {
    this.execCommand("underline");
  }

  setLink() {
    this.execCommand("createLink","http://google.fr");
    this.execCommand('underline');
  }

  setFontSize() {
    this.execCommand('fontSize', this.selectedFontSize);
  }

  setFontColor() {
    this.execCommand('foreColor', this.selectedFontColor);
  }

  setFontBackgroundColor() {
    this.execCommand('hiliteColor', this.selectedFontBackgroundColor);
  }

  uploadImage(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if(file) {
      const imageUrl = URL.createObjectURL(file);
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.width = this.imageWidth + 'px';
      img.style.height = 'auto';
      img.style.marginTop = '-5px';
      img.style.display = 'inline';
      
      const selection = window.getSelection();
      const range = selection!.getRangeAt(0);
      range.insertNode(img);
      
      //set cursor after the img
      const newRange = document.createRange();
      const newSelection = window.getSelection();
      newRange.setStartAfter(img);
      newRange.setEndAfter(img);
      newSelection!.removeAllRanges();
      newSelection!.addRange(newRange);
    }
    fileInput.value = null;
  } 


  //TESTING SOME DIALOG FUNCTIONS NOT USED YET

  // modalData: ModalData = {
  //   bold: true,
  //   italic: false,
  //   underline: false,
  // }
  modalData: ModalData = {
    title: "Share your note",
    name: '',
    animal: '',
    sharedUsers: this.sharedUsers,
  }

  shareWithUsersDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
        minWidth: '400px',
        height: '90%',
        data: this.modalData,
    });
    dialogRef.afterClosed().subscribe((response) => {
        if(response) {
          if(response[0] === "" || response[1] === "") {
              response[0] = "bird"; 
              response[1] = "fish";
          }
          // this.modalData.animal = response[0];
          // this.modalData.name = response[1];
        }
    });
  }
  

  openFontDialog(x:number, y:number): void {
    const dialogRef = this.dialog.open(DialogFontComponent, {
      width:'8rem',
      height:'2rem',
      position: { left: (x - 75)+'px', top: (y - 32)+'px' },
      data: this.modalData,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if(response) {
        
      }
    });
  }

  //TESTING SOME MOUSE FUNCTIONS NOT USED YET
  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    if(event.button === 0) this.onLeftBtnMouseDown();
    else if(event.button === 1) this.onCenterBtnMouseDown();
    else if(event.button === 2) this.onRightBtnMouseDown(event.clientX, event.clientY);
    // switch(event.button) {
    //   case 0: {  
    //     this.onLeftBtnMouseDown();
    //     break; 
    //   } 
    //   case 1: { 
    //     this.onCenterBtnMouseDown();
    //     break; 
    //   } 
    //   case 2: {
    //     this.onRightBtnMouseDown(event.clientX, event.clientY)
    //     break; 
    //   }
    //   default:
    //     alert(`Unknown button code: ${event.button}`);
    // } 
    
  }
  
  onLeftBtnMouseDown() { alert("left btn") }
  
  onCenterBtnMouseDown() { alert("center btn") }
  
  onRightBtnMouseDown(x:number, y:number) { 
    let selection;
    if(selection = window.getSelection()?.toString().length) {
      if(selection > 0) {
        console.log(selection);
        this.openFontDialog(x, y) 
      }
    }
  }

}
