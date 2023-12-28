import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent, ModalData } from 'src/app/dialogs/dialog/dialog.component';
import { User } from 'src/app/models/user';
import { SessionStorageService } from 'src/app/services/session-storage.service';

const NOTE_ICON = "assets/icons/note.svg";
const NOTEPAD_ICON = "assets/icons/notepad.svg";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  SAVE_ICON = "assets/icons/save.png";
  UNDERLINE_ICON = "assets/icons/underline.png";
  HIGHLIGHTER_ICON = "assets/icons/highlighter.png";
  sharedUsers!: User[] | null;

  modalData: ModalData = {
    title : "title",
    name  : "dog",
    animal: "cat",
    sharedUsers: this.sharedUsers,
  }

  constructor(public sessionStorageService: SessionStorageService,
              public router: Router,
              public dialog: MatDialog,
              public iconRegistry: MatIconRegistry,
              public sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('note', sanitizer.bypassSecurityTrustResourceUrl(NOTE_ICON));
    iconRegistry.addSvgIcon('notepad', sanitizer.bypassSecurityTrustResourceUrl(NOTEPAD_ICON));
    //iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
        // width : '300px', // height: '250px',
        data: this.modalData,
    });
    dialogRef.afterClosed().subscribe((response) => {
        if(response) {
          if(response[0] === "" || response[1] === "") {
              response[0] = "bird"; 
              response[1] = "fish";
          }
          this.modalData.animal = response[0];
          this.modalData.name = response[1];
        }
    });
  }

  goToEditor() {
    this.router.navigate(['/editor']);
  }

}
