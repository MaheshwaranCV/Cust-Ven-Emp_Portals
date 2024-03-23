import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';


@Component({
  selector: 'app-vp-req-quotation',
  templateUrl: './vp-req-quotation.component.html',
  styleUrls: ['./vp-req-quotation.component.css']
})
export class VpReqQuotationComponent {
  loading: boolean = true;
  quo: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'PO_NUMBER': 'DOCUMENT NUMBER',
    'CO_CODE': 'COMPANY CODE',
    'CREATED_ON': 'CREATION DATE',
    'VENDOR': 'VENDOR ID',
    'PURCH_ORG': 'PURCHASE ORGANIZATION',
    'PUR_GROUP': 'PURCHASE GROUP',
    'VEND_NAME': 'VENDOR NAME',
    'CURRENCY_ISO': 'CURRENCY'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchReqQuoData();
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

  fetchReqQuoData(): void {
    this.http.post("http://localhost:3000/vp-req-quotation", "{}").subscribe((resp: any) => {

      this.quo = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_REQ_QUOTATION_MAHESH_FM.Response']['IT_RFQ_LIST']['item'];
      this.arrayLength = this.quo.length
      console.log(this.quo)
      this.loading = false;
      this.quo.shift();
    });

  } sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.quo.sort((a: any, b: any) => {
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
      return this.quo;
    }
    const search = this.searchText.toLowerCase();
    return this.quo.filter((quo: any) => {
      return Object.values(quo).some((value: any) => {
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
    window.open('https://sievo.com/blog/the-simple-request-for-quotation-rfq-process-for-procurement', '_blank');
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
    const displayedFields = ['PO_NUMBER', 'CO_CODE', 'CREATED_ON', 'VENDOR', 'PURCH_ORG', 'PUR_GROUP', 'VEND_NAME','CURRENCY_ISO'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('ON') ? this.formatDate(fieldValue) : (field === 'VENDOR' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}