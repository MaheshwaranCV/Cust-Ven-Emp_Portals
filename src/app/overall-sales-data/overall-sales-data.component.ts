import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-overall-sales-data',
  templateUrl: './overall-sales-data.component.html',
  styleUrls: ['./overall-sales-data.component.css']
})
export class OverallSalesDataComponent implements OnInit {

  loading: boolean = true;
  overallSales: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'VBELN': 'SALES DOCUMENT NUMBER',
    'ERDAT': 'ENTRY DATE',
    'ERZET': 'ENTRY TIME',
    'NETWR': 'NET VALUE',
    'WAERK': 'CURRENCY',
    'VKORG': 'SALES ORGANIZATION',
    'BSTNK': 'DESCRIPTION',
    'KALSM': 'MATERIAL ID',
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}



  ngOnInit(): void {
    this.loading = true;
    this.fetchOASsData();
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

  fetchOASsData(): void {

    this.http.post("http://localhost:3000/overallsales", "{}").subscribe((resp: any) => {

      this.overallSales = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_OVERALL_SALE2_MAHESH_FMResponse']['OVERALLSALES']['item'];
      console.log(this.overallSales)
      console.log(this.arrayLength)
      this.loading = false;
      this.arrayLength = this.overallSales.length;
    });
  }

  sortColumn(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.overallSales.sort((a: any, b: any) => {
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
      return this.overallSales;
    }
    const search = this.searchText.toLowerCase();
    return this.overallSales.filter((overallSales: any) => {
      return Object.values(overallSales).some((value: any) => {
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
    window.open('https://www.investopedia.com/terms/n/netsales.asp', '_blank');
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
    const displayedFields = ['VBELN', 'VKORG', 'ERDAT','ERZET', 'KALSM', 'BSTNK', 'NETWR', 'WAERK'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('DAT') ? this.formatDate(fieldValue) : ( field === 'VBELN' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}