import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  isloading: boolean = true;
  Invoices: any;
  arrayLength: any;
  pdf: any;
  inv_pdf: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';
  printPdf: string | null = null;
  showButtons = false;

  fieldNamesMap: { [key: string]: string } = {
    'VBELN': 'INVOICE NUMBER',
    'NETWR': 'AMOUNT',
    'WAERK': 'CURRENCY',
    'VKORG': 'SALES ORGANIZATION',
    'ERDAT': 'RECORD CREATED',
    'FKDAT': 'DOCUMENT DATE',
    'FKART': 'DOCUMENT CATEGORY',
    'KUNRG': 'CUSTOMER NUMBER',
    'FKTYP': 'ACCOUNT TYPE',
    'VBTYP': 'SALES DOCUMENT TYPE',
    'LAND1': 'COUNTRY CODE',
    'ZTERM': 'PAYMENT TERMS',
  };


  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
    this.isloading = true;
    this.fetchInvoiceeData();
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

  fetchInvoiceeData(): void {

    this.http.post("http://localhost:3000/invoice-details", "{}").subscribe((resp: any) => {
      this.Invoices = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_INVOICE3_MAHESH_FMResponse']['IT_INVOICE']['item'];
      this.arrayLength = this.Invoices.length
      this.isloading = false;
    })


    this.http.post("http://localhost:3000/invoicepdff", "").subscribe(response => {
      this.inv_pdf = response
      console.log(this.inv_pdf)
    })
  }

  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Invoices.sort((a: any, b: any) => {
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

  download_inv() {
    this.http.post("http://localhost:3000/invoicepdff", "").subscribe((response: any) => {
      this.printPdf = response.xmljs;
      console.log(this.printPdf);
      const linkSource = `data:application/pdf;base64,${this.printPdf}`;
      const downloadLink = document.createElement("a");
      const fileName = "Customer Invoice.pdf";
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
    const emailSubject = 'Customer Invoice';
    const emailBody = 'Please find the attached Customer Invoice for your reference.';

    const mailToUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailToUrl);
  }

  filterData(): any[] {
    if (!this.searchText) {
      return this.Invoices;
    }
    const search = this.searchText.toLowerCase();
    return this.Invoices.filter((Invoice: any) => {
      return Object.values(Invoice).some((value: any) => {
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
    window.open('https://www.investopedia.com/terms/i/invoice.asp', '_blank');
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
    const displayedFields = ['KUNRG', 'VBELN', 'FKART', 'FKTYP', 'VKORG', 'FKDAT', 'VBTYP', 'LAND1', 'ERDAT', 'NETWR', 'WAERK', 'ZTERM'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : (field === 'KUNRG' || field === 'VBELN' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}