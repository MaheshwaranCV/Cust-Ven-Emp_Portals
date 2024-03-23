import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-sale-order-data',
  templateUrl: './sale-order-data.component.html',
  styleUrls: ['./sale-order-data.component.css']
})
export class SaleOrderDataComponent implements OnInit {

  loading: boolean = true;
  Salesorders: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'VBELN': 'SALE ORDER NUMBER',
    'FKDAT': 'BILLING DATE',
    'FKART': 'BILLING TYPE',
    'WAERK': 'CURRENCY',
    'NETWR': 'NET ORDER VALUE',
    'INCO2': 'PLACE',
    'KALSM': 'MATERIAL ID'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchSalesordersData();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }

  formatNum(numString: string): string {
    const num = parseInt(numString, 10);
    return `${num}`;
  }

  fetchSalesordersData(): void {

    this.http.post("http://localhost:3000/salesorder", "{}").subscribe((resp: any) => {

      this.Salesorders = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_SALE_ORDER2_MAHESH_FMResponse']['IT_INVOICE']['item'];
      this.arrayLength = this.Salesorders.length
      console.log(this.Salesorders)
      this.loading = false;
    });
  }
  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Salesorders.sort((a: any, b: any) => {
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
      return this.Salesorders;
    }
    const search = this.searchText.toLowerCase();
    return this.Salesorders.filter((salesorder: any) => {
      return Object.values(salesorder).some((value: any) => {
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
    window.open('https://help.sap.com/docs/CARAB/e95c8443f589486bbfec99331049704a/1b516cfd6beb4746aae882277e45d075.html', '_blank');
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
    const displayedFields = ['VBELN', 'FKDAT', 'FKART', 'KALSM', 'NETWR', 'WAERK', 'INCO2'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : ( field === 'VBELN' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}