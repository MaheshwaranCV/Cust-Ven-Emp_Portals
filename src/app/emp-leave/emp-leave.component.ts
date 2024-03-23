import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from '../row-details-dialog/row-details-dialog.component';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.css']
})
export class EmpLeaveComponent {
  loading: boolean = true;
  Leaves: any;
  arrayLength: any;
  sortedColumn: string = '';
  sortDirection: string = '';
  searchText: string = '';

  fieldNamesMap: { [key: string]: string } = {
    'EMPLOYEENO': 'PERSONNEL NUMBER',
    'VALIDBEGIN': 'VALID BEGINNING',
    'VALIDEND': 'VALID ENDING',
    'NAMEOFABSENCETYPE': 'ABSENCE TYPE',
    'ABSENCEDAYS': 'ABSENCE DAYS',
    'ABSENCEHOURS': 'ABSENCE HOURS'
  };

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchLeaveData();
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

  fetchLeaveData(): void {
    this.http.post("http://localhost:3000/emp-leave", "{}").subscribe((resp: any) => {
      this.Leaves = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZEP_LEAVE_MAHESH_FM.Response']['IT_LEAVE_DATA']['item'];
      this.arrayLength = this.Leaves.length;
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

    this.Leaves.sort((a: any, b: any) => {
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
      return this.Leaves;
    }
    const search = this.searchText.toLowerCase();
    return this.Leaves.filter((Leave: any) => {
      return Object.values(Leave).some((value: any) => {
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
    window.open('https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7d5698fcfca348879252ded2a2293b1a/19a89953d2b3e747e10000000a441470.html', '_blank');
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
    const displayedFields = ['EMPLOYEENO', 'VALIDBEGIN','VALIDEND', 'NAMEOFABSENCETYPE', 'ABSENCEDAYS', 'ABSENCEHOURS'];

    const formattedRowData = displayedFields.map((field: string) => {
      const fieldValue = rowData[field]?._text || '';
      const formattedValue = field.includes('VALID') ? this.formatDate(fieldValue) : (field === 'EMPLOYEENO' ? this.formatNum(fieldValue) : fieldValue);
      return { field, value: formattedValue };
    });

    const dialogRef = this.dialog.open(RowDetailsDialogComponent, {
      data: { rowData: formattedRowData, fieldNamesMap: this.fieldNamesMap }
    });
  }
}