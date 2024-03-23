import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-emp-payslip',
  templateUrl: './emp-payslip.component.html',
  styleUrls: ['./emp-payslip.component.css']
})
export class EmpPayslipComponent implements OnInit {
  isloading: boolean = true;
  Payslips: any;
  arrayLength: any;
  pdf: any;
  ep_inv_pdf: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';
  printPdf: string | null = null;
  showButtons = false;

  fieldNamesMap: { [key: string]: string } = {
    'PERNR': 'PERSONNEL NUMBER',
    'BEGDA': 'BEGINNING DATE',
    'ENDDA': 'ENDING DATE',
    'TRFGR': 'PAY SCALE GROUP',
    'ANSAL': 'ANNUAL SALARY',
    'DIVGV': 'WORK HOURS',
    'WAERS': 'CURRENCY'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
    this.isloading = true;
    this.fetchPayslipData();
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

  fetchPayslipData(): void {
    this.http.post("http://localhost:3000/emp-payslip", "{}").subscribe((resp: any) => {
      this.Payslips = resp['soap-env:Envelope']['soap-env:Body']['n0:ZEP_PAYSLIP2_MAHESH_FMResponse']['IT_PAYSLIP']['item'];
      this.arrayLength = this.Payslips.length
      this.isloading = false;
    })

    this.http.post("http://localhost:3000/invoicepdffe", "").subscribe(response => {
      this.ep_inv_pdf = response
      console.log(this.ep_inv_pdf)
    })
  }

  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.Payslips.sort((a: any, b: any) => {
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
  



  download_ep_pay() {
    this.http.post("http://localhost:3000/invoicepdffe", "").subscribe((response: any) => {
      this.printPdf = response.xmljs;
      console.log(this.printPdf);
      const linkSource = `data:application/pdf;base64,${this.printPdf}`;
      const downloadLink = document.createElement("a");
      const fileName = "Employee Salary Pay slip.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      this.showButtons = true;
    });
  }


  printyPage() {
    if (!this.printPdf) {
      console.error('PDF data is not available for printing.');
      return;
    }
  
    const pdfBlob = this.base64ToBlob(this.printPdf, 'application/pdf');
    const pdfUrl = URL.createObjectURL(pdfBlob);
  
    const printWindow = window.open(pdfUrl, '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Print window could not be opened.');
      return;
    }
  
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(pdfUrl);
    };
  }

  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  }
  

  @Input() limit: number | undefined;

  @Output() pageEvent = new EventEmitter();

  loading = true;

  length = 0;

  pageSize = 10;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource = [];

  displayedColumns = ['id', 'size', 'name', 'city', 'price', 'status', 'date'];
  
  printPage() {
    window.print();
  }

  sendEmail() {
    const emailRecipient = 'recipient@example.com';
    const emailSubject = 'Employee Salary Pay Slip';
    const emailBody = 'Please find the attached Salary Pay Slip for your reference.';

    const mailToUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailToUrl);
  }

  filterData(): any[] {
    if (!this.searchText) {
      return this.Payslips;
    }
    const search = this.searchText.toLowerCase();
    return this.Payslips.filter((Payslip: any) => {
      return Object.values(Payslip).some((value: any) => {
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
        this.router.navigate(['/ep-login']);
      }
    });
  }

  footerButtonClick() {
    window.open('https://www.paisabazaar.com/tax/salary-slip/', '_blank');
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
    const displayedFields = ['PERNR', 'BEGDA','ENDDA', 'TRFGR', 'ANSAL', 'DIVGV', 'WAERS'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DA') ? this.formatDate(fieldValue) : (field === 'PERNR' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}