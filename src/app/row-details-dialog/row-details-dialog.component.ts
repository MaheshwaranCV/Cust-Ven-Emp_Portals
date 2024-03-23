import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-row-details-dialog',
  templateUrl: './row-details-dialog.component.html',
  styleUrls: ['./row-details-dialog.component.css']
})
export class RowDetailsDialogComponent {
  rowData: any[];
  fieldNamesMap: { [key: string]: string };

  constructor(
    public dialogRef: MatDialogRef<RowDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rowData = data.rowData;
    this.fieldNamesMap = data.fieldNamesMap;
  }
}