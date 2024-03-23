import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-inquiry-data',
  templateUrl: './inquiry-data.component.html',
  styleUrls: ['./inquiry-data.component.css']
})
export class InquiryDataComponent implements OnInit {

  loading: boolean = true;
  Inquiries: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'KUNNR': 'CUSTOMER NUMBER',
    'ERDAT': 'INQUIRY DATE',
    'VBELN': 'DOCUMENT NUMBER',
    'AUDAT': 'DOCUMENT DATE',
    'KALSM': 'MATERIAL ID',
    'VKORG': 'SALES ORGANIZATION',
    'VDATU': 'REQUESTED DELIVERY DATE'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
    this.loading = true;
    this.fetchInquiryData();
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

  fetchInquiryData(): void {
    this.http.post("http://localhost:3000/inquiry", "{}").subscribe((resp: any) => {
      this.Inquiries = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_INQUIRY_MAHESH_FMResponse']['IT_INQUIRY']['item'];
      this.arrayLength = this.Inquiries.length;
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
    this.Inquiries.sort((a: any, b: any) => {
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
      return this.Inquiries;
    }
    const search = this.searchText.toLowerCase();
    return this.Inquiries.filter((Inquiries: any) => {
      return Object.values(Inquiries).some((value: any) => {
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
    window.open('https://help.sap.com/docs/SAP_ERP_SPV/78e0627c34ef43879d72718e21ea517b/2364b65334e6b54ce10000000a174cb4.html', '_blank');
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
    const displayedFields = ['KUNNR', 'ERDAT', 'VBELN', 'AUDAT', 'KALSM', 'VKORG', 'VDATU'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : (field === 'KUNNR' || field === 'VBELN' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}