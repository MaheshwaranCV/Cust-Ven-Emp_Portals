import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  closeDialog(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
