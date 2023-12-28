import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ModalData {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

@Component({
  selector: 'app-dialog-font',
  templateUrl: './dialog-font.component.html',
  styleUrls: ['./dialog-font.component.scss']
})
export class DialogFontComponent {

  BOLD_ICON      = "assets/icons/bold.png";
  ITALIC_ICON    = "assets/icons/italic.png";
  UNDERLINE_ICON = "assets/icons/underline.png";
  LINK_ICON      = "assets/icons/link.png";
  
  constructor(public dialogRef: MatDialogRef<DialogFontComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk() {
    this.dialogRef.close();
  }

  execCommand(arg1: string, arg2: string = '') {
    document.execCommand(arg1, false, arg2);
    this.dialogRef.close();
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

}

