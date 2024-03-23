import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';


@Component({
  selector: 'app-credit-debit-memo',
  templateUrl: './credit-debit-memo.component.html',
  styleUrls: ['./credit-debit-memo.component.css']
})



export class CreditDebitMemoComponent implements OnInit {
  loading: boolean = true;
  Credits: any;
  Debits: any;
  arrayLength: any;
  arrayLengthy: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'GJAHR': 'FISCAL YEAR',
    'AUGDT': 'CLEARING DATE',
    'BELNR': 'DOCUMENT NUMBER',
    'PSWBT': 'AMOUNT',
    'PSWSL': 'CURRENCY'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}




  ngOnInit(): void {
    this.loading = true;
    this.fetchCreDebData();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }

  formatNum(numString: string, isFirstRow: boolean): string {
    if (isFirstRow) {
      return numString;
    }
  
    const num = parseInt(numString, 10);
    return `${num}`;
  }
  

  fetchCreDebData(): void {
    this.http.post("http://localhost:3000/transactions", "{}").subscribe((resp: any) => {

      this.Credits = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_CREDIT_DEBIT2_MAHESH_FMResponse']['TAB_CRMEMO']['item'];
      this.Debits = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_CREDIT_DEBIT2_MAHESH_FMResponse']['TAB_DBMEMO']['item'];
      console.log(this.Credits)
      console.log(this.Debits)
      this.loading = false;
      this.arrayLength = this.Credits.length;
      this.arrayLengthy = this.Debits.length;

    });
  } 
  
  sortColumn(column: string): void {
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
          const formattedValue = this.formatDate(value._text).toLowerCase();
          return formattedValue.includes(search);
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
  clearSearched(): void {
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
    window.open('https://www.investopedia.com/terms/d/debit-memorandum.asp#:~:text=A%20debit%20memorandum%2C%20or%20debit,for%20adjustments%20beyond%20normal%20debits.', '_blank');
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
    const displayedFields = ['GJAHR', 'AUGDT','BELNR', 'PSWBT', 'PSWSL'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DT') ? this.formatDate(fieldValue) : fieldValue;
      return { field, value: formattedValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}