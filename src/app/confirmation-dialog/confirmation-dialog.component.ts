import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-your-component',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed. Navigating...');
      } else {
        console.log('User cancelled.');
      }
    });
  }
}
