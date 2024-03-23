import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-fin-details',
  templateUrl: './fin-details.component.html',
  styleUrls: ['./fin-details.component.css']
})
export class FinDetailsComponent {
  title: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  INVOICE_DETAILS() {
    this.router.navigate(['invoice-details']);
  }
  PAYMENTS_AND_AGING() {
    this.router.navigate(['payments-and-aging']);
  }

  CREDIT_DEBIT_MEMO() {
    this.router.navigate(['credit-debit-memo']);
  }

  OVERALL_SALES_DATA() {
    this.router.navigate(['overall-sales-data']);
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
}