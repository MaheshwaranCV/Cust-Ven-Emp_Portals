import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';


@Component({
  selector: 'app-vp-invoice-details',
  templateUrl: './vp-invoice-details.component.html',
  styleUrls: ['./vp-invoice-details.component.css']
})
export class VPInvoiceDetailsComponent implements OnInit {
  isloading: boolean = true;
  Invoice: any;
  arrayLength: any;
  pdf: any;
  vp_inv_pdf: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';
  printPdf: string | null = null;
  showButtons = false;

  fieldNamesMap: { [key: string]: string } = {
    'BUKRS': 'COMPANY CODE',
    'BELNR': 'DOCUMENT NUMBER',
    'GJAHR': 'FISCAL YEAR',
    'DMBTR': 'AMOUNT',
    'WAERS': 'CURRENCY'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
    this.isloading = true;
    this.fetchInvoiceeeData();
  }

  fetchInvoiceeeData(): void {
    this.http.post("http://localhost:3000/vp-invoice-details", "{}").subscribe((resp: any) => {

      this.Invoice = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_INVOICE_MAHESH_FM.Response']['IT_INVOICE_DETAILS']['item'];
      this.arrayLength = this.Invoice.length
      this.isloading = false;
      this.Invoice.shift();
    })

    this.http.post("http://localhost:3000/invoicepdfff", "").subscribe(response => {
      this.vp_inv_pdf = response
      console.log(this.vp_inv_pdf)
    })
  }
  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.Invoice.sort((a: any, b: any) => {
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

  download_vp_inv() {
    this.http.post("http://localhost:3000/invoicepdfff", "").subscribe((response: any) => {
      this.printPdf = response.xmljs;
      console.log(this.printPdf);
      const linkSource = `data:application/pdf;base64,${this.printPdf}`;
      const downloadLink = document.createElement("a");
      const fileName = "Vendor Invoice.pdf";
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
    const emailSubject = 'Vendor Invoice';
    const emailBody = 'Please find the attached Vendor Invoice for your reference.';

    const mailToUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailToUrl);
  }

  filterData(): any[] {
    if (!this.searchText) {
      return this.Invoice;
    }
    const search = this.searchText.toLowerCase();
    return this.Invoice.filter((invoice: any) => {
      return Object.values(invoice).some((value: any) => {
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
        this.router.navigate(['/vp-login']);
      }
    });
  }
  footerButtonClick() {
    window.open('https://tipalti.com/vendor-invoice/#:~:text=A%20vendor%20invoice%20is%20a,purchase%20order%20to%20product%20receipt.', '_blank');
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
    const displayedFields = ['BUKRS', 'BELNR', 'GJAHR', 'DMBTR', 'WAERS'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      return { field, value: fieldValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  } 
}