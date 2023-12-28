import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl } from '@angular/forms';
import { Observable, Subscribable } from 'rxjs';

export interface ModalData {
  title:string;
  name: string;
  animal: string;
  sharedUsers: User[] | null;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent implements OnInit {
  
  test: number[] = [1,2,3,4,5,6,7,8,9];
  
  constructor(public dialogRef: MatDialogRef<DialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: ModalData) {}
              
  ngOnInit() {}
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onOk() {
    this.dialogRef.close();
  }

}
