import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';


@Component({
  selector: 'app-vp-goods-receipt',
  templateUrl: './vp-goods-receipt.component.html',
  styleUrls: ['./vp-goods-receipt.component.css']
})
export class VpGoodsReceiptComponent {
  loading: boolean = true;
  Goodsreceipt: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'INV_DOC_NO': 'INVOICE DOCUMENT NUMBER',
    'FISC_YEAR': 'FISCAL YEAR',
    'DOC_DATE': 'DOCUMENT DATE',
    'ENTRY_TIME': 'ENTRY TIME',
    'COMP_CODE': 'COMPANY CODE',
    'GROSS_AMNT': 'GROSS AMOUNT',
    'CURRENCY': 'CURRENCY'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchGoReData();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }

  fetchGoReData(): void {


    this.http.post("http://localhost:3000/vp-goods-receipt", "{}").subscribe((resp: any) => {

      this.Goodsreceipt = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_GOODSRECEIPT_MAHESH_FM.Response']['IT_GOODS_HEADER']['item'];
      this.arrayLength = this.Goodsreceipt.length
      console.log(this.Goodsreceipt)
      this.loading = false;
      this.arrayLength = this.Goodsreceipt.length;


    });



  } sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.Goodsreceipt.sort((a: any, b: any) => {
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
      return this.Goodsreceipt;
    }
    const search = this.searchText.toLowerCase();
    return this.Goodsreceipt.filter((goodreceipt: any) => {
      return Object.values(goodreceipt).some((value: any) => {
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
    window.open('https://www.upcounsel.com/goods-receipt', '_blank');
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
    const displayedFields = ['INV_DOC_NO', 'FISC_YEAR', 'DOC_DATE', 'ENTRY_TIME', 'COMP_CODE', 'GROSS_AMNT', 'CURRENCY'];
  
    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : fieldValue;
      return { field, value: formattedValue };
    });
  
    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}