import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-vp-purchase-order',
  templateUrl: './vp-purchase-order.component.html',
  styleUrls: ['./vp-purchase-order.component.css']
})
export class VpPurchaseOrderComponent {
  loading: boolean = true;
  Purchase: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'PO_NUMBER': 'PURCHASE ORDER',
    'CO_CODE': 'COMPANY CODE',
    'CREATED_ON': 'CREATED ON',
    'CURRENCY': 'CURRENCY',
    'PUR_GROUP': 'PURCHASE GROUP'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchPurchOrdData();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }

  fetchPurchOrdData(): void {

    this.http.post("http://localhost:3000/vp-purchase-order", "{}").subscribe((resp: any) => {
      this.Purchase = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_PURCHASE_ORD_MAHESH_FM.Response']['IT_PURCHASE_ORDER_HEADER']['item'];
      this.arrayLength = this.Purchase.length;
      this.loading = false;
      this.Purchase.shift();
    });
  }
  
  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Purchase.sort((a: any, b: any) => {
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
      return this.Purchase;
    }
    const search = this.searchText.toLowerCase();
    return this.Purchase.filter((purchase_ord: any) => {
      return Object.values(purchase_ord).some((value: any) => {
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
        this.router.navigate(['/vp-login']);
      }
    });
  }

  footerButtonClick() {
    window.open('https://vendorcentric.com/single-post/when-does-it-make-sense-to-use-a-purchase-order/#:~:text=Purchase%20Orders%20are%20documents%20issued,goods%2Fservices%20that%20were%20ordered.', '_blank');
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
    const displayedFields = ['PO_NUMBER', 'CO_CODE', 'CREATED_ON', 'CURRENCY', 'PUR_GROUP'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('ON') ? this.formatDate(fieldValue) : fieldValue;
      return { field, value: formattedValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}