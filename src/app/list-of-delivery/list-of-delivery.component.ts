import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-list-of-delivery',
  templateUrl: './list-of-delivery.component.html',
  styleUrls: ['./list-of-delivery.component.css']
})
export class ListOfDeliveryComponent implements OnInit {

  loading: boolean = true;
  Lods: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'ERZET': 'ENTRY TIME',
    'ERDAT': 'ENTRY DATE',
    'LDDAT': 'LOADING DATE',
    'KODAT': 'PICKING DATE',
    'LFDAT': 'DELIVERY DATE',
    'VSTEL': 'WAREHOUSE LOCATION',
    'KALSM': 'MATERIAL ID'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}




  ngOnInit(): void {
    this.loading = true;
    this.fetchLodsData();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }

  fetchLodsData(): void {
    this.http.post("http://localhost:3000/lod", "{}").subscribe((resp: any) => {

      this.Lods = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_LOD_MAHESH_FMResponse']['IT_LOD']['item'];
      this.arrayLength = this.Lods.length
      console.log(this.Lods)
      console.log(this.arrayLength)
      this.loading = false;
      this.Lods.shift();
    });
  }

  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Lods.sort((a: any, b: any) => {
      const valueA = a[column]._text;
      const valueB = b[column]._text;
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }

  getSortIcon(column: string): string {
    if (column === this.sortedColumn) {
      return this.sortDirection === 'asc' ? 'asc-icon' : 'desc-icon';
    }
    return 'no-sort-icon';
  }
  printPage() {
    window.print();
  }


  filterData(): any[] {
    if (!this.searchText) {
      return this.Lods;
    }
    const search = this.searchText.toLowerCase();
    return this.Lods.filter((lod: any) => {
      return Object.values(lod).some((value: any) => {
        if (value && typeof value === 'object' && '_text' in value) {
          const formattedValue = this.formatDate(value._text).toLowerCase();
          return formattedValue.includes(search);
        }
        return false;
      });
    });
  }
  clearSearch(): void {
    this.searchText = '';
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        console.log('Logging out...');
        this.router.navigate(['/login']);
      }
    });
  }  

  footerButtonClick() {
    window.open('https://sap4tech.net/sap-delivery-tcodes/?utm_content=cmp-true', '_blank');
  }

  openNavigationConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        console.log('Navigating to Home Page...');
        this.router.navigate(['/starter-page']);
      }
    });
  }


  openRowDetailsDialog(rowData: any): void {
    const displayedFields = ['ERDAT', 'ERZET', 'KALSM', 'LDDAT', 'KODAT', 'LFDAT', 'VSTEL'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : fieldValue;
      return { field, value: formattedValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
  
}