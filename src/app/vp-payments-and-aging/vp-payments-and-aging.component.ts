import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vp-payments-and-aging',
  templateUrl: './vp-payments-and-aging.component.html',
  styleUrls: ['./vp-payments-and-aging.component.css']
})
export class VPPaymentsAndAgingComponent {
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
  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

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

  fetchPayagesData(): void {

    this.http.post("http://localhost:3000/vp-payments-and-aging", "{}").subscribe((resp: any) => {

      const paymentss = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_PAYMENTAGING_MAHESH_FM.Response']['IT_PAYMENT_AGING']['item'];
      if (Array.isArray(paymentss)) {
        this.Payages = paymentss;
      } else {
        this.Payages = [paymentss];
      }
      this.calculateAgingDifferences();
      console.log(this.Payages)
      this.loading = false;
      this.arrayLength = this.Payages.length;
    });
  }

  calculateAgingDifferences(): void {
    const currentDate = new Date();
    this.agingDifferences = this.Payages.map((paymentss: any) => {
      const blineDateeStr = paymentss['PSTNG_DATE']._text;
      const blineDatee = new Date(blineDateeStr);
      const blineDateStr = paymentss['BLINE_DATE']._text;
      const blineDate = new Date(blineDateStr);
      const timeDifference = blineDatee.getTime() - blineDate.getTime();
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
    return this.Payages.filter((payment: any) => {
      return Object.values(payment).some((value: any) => {
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
    window.open('https://tipalti.com/accounts-payable-aging-report/', '_blank');
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