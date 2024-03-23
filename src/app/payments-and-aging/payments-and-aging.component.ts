import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payments-and-aging',
  templateUrl: './payments-and-aging.component.html',
  styleUrls: ['./payments-and-aging.component.css']
})
export class PaymentsAndAgingComponent {
  loading: boolean = true;
  Payages: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';
  agingDifferences: number[] = [];
  selectedRow: any = null;
  selectedRowAgingDifference: number | null = null;

  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;
  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchPayagesData();
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

  fetchPayagesData(): void {

    this.http.post("http://localhost:3000/paymentaging", "{}").subscribe((resp: any) => {
    const payments = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_PAYMENTAGING2_MAHESH_FMResponse']['IT_DET']['item'];
    if (Array.isArray(payments)) {
      this.Payages = payments;
    } else {
      this.Payages = [payments];
    }
    this.calculateAgingDifferences();
      console.log(this.Payages);
      this.loading = false;
      this.arrayLength = this.Payages.length
    });
  }

  calculateAgingDifferences(): void {
    const currentDate = new Date();
    this.agingDifferences = this.Payages.map((payment: any) => {
      const blineDateStr = payment['PSTNG_DATE']._text;
      const blineDate = new Date(blineDateStr);
      const blineDateeStr = payment['ENTRY_DATE']._text;
      const blineDatee = new Date(blineDateeStr);
      const timeDifference = blineDate.getTime() - blineDatee.getTime();
      const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return differenceInDays;
    });
  }

  onRowClick(payage: any, agingDifference: number): void {
    this.selectedRow = payage;
    this.selectedRowAgingDifference = agingDifference;
  }

  openAgingDialog(payage: any, agingDifference: number): void {
    this.dialog.open(this.dialogContent, {
      data: { agingDifference },
    });
  }

  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.Payages.sort((a: any, b: any) => {
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
      return this.Payages;
    }
    const search = this.searchText.toLowerCase();
    return this.Payages.filter((payage: any) => {
      return Object.values(payage).some((value: any) => {
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
    window.open('https://www.investopedia.com/terms/a/aging.asp', '_blank');
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
}