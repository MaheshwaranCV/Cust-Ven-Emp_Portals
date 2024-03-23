import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-vp-credit-debit-memo',
  templateUrl: './vp-credit-debit-memo.component.html',
  styleUrls: ['./vp-credit-debit-memo.component.css']
})
export class VpCreditDebitMemoComponent {
  loading: boolean = true;
  Credits: any;
  Debits: any;
  arrayLength: any;
  arrayLengthy: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'KUNNR': 'VENDOR NUMBER',
    'MATNR': 'MATERIAL NUMBER',
    'WERKS': 'PLANT NUMBER',
    'MENGE': 'COMPONENT QUANTITY',
    'BELNR': 'DOCUMENT NUMBER',
    'GJAHR': 'FISCAL YEAR',
    'DMBTR': 'AMOUNT'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchVpCreDebData();
  }

  formatNum(numString: string, isFirstRow: boolean): string {
    if (isFirstRow) {
      return numString;
    }
  
    const num = parseInt(numString, 10);
    return `${num}`;
  }

  fetchVpCreDebData(): void {

    this.http.post("http://localhost:3000/vp-credit-debit-memo", "{}").subscribe((resp: any) => {

      this.Credits = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_CREDIT_DEBIT_MAHESH_FM.Response']['IT_CREDIT_MEMO']['item'];
      this.Debits = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_CREDIT_DEBIT_MAHESH_FM.Response']['IT_DEBIT_MEMO']['item'];
      console.log(this.Credits)
      console.log(this.Debits)
      this.loading = false;
      this.arrayLength = this.Credits.length;
      this.arrayLengthy = this.Debits.length;

    });




  } sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Credits.sort((a: any, b: any) => {
      const valueA = a[column]._text;
      const valueB = b[column]._text;
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }),
      this.Debits.sort((a: any, b: any) => {
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
      return this.Credits;
    }
    const search = this.searchText.toLowerCase();
    return this.Credits.filter((credit: any) => {
      return Object.values(credit).some((value: any) => {
        if (value && typeof value === 'object' && '_text' in value) {
          return value._text.toLowerCase().includes(search);
        }
        return false;
      });
    });
  }
  filterDataa(): any[] {
    if (!this.searchText) {
      return this.Debits;
    }
    const search = this.searchText.toLowerCase();
    return this.Debits.filter((debit: any) => {
      return Object.values(debit).some((value: any) => {
        if (value && typeof value === 'object' && '_text' in value) {
          return value._text.toLowerCase().includes(search);
        }
        return false;
      });
    });
  }
  clearSearch(): void {
    this.searchText = '';
  }
  clearSearched(): void {
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
    window.open('https://www.investopedia.com/terms/d/debit-note.asp#:~:text=A%20debit%20note%2C%20also%20known,seller%20has%20debited%20their%20account.', '_blank');
  }
  footerButtonClicky() {
    window.open('https://tallysolutions.com/accounting/credit-memo-definition-format-scenarios-and-example/#gref', '_blank');
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
    const displayedFields = ['KUNNR', 'MATNR', 'WERKS', 'MENGE', 'BELNR', 'GJAHR', 'DMBTR'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      return { field, value: fieldValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  } 
}