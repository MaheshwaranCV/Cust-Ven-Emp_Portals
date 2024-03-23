import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-ven-fin-details',
  templateUrl: './ven-fin-details.component.html',
  styleUrls: ['./ven-fin-details.component.css']
})
export class VenFinDetailsComponent {
  title: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  VEN_INVOICE_DETAILS() {
    this.router.navigate(['vp-invoice-details']);
  }
  VEN_PAYMENTS_AND_AGING() {
    this.router.navigate(['vp-payments-and-aging']);
  }

  VEN_CREDIT_DEBIT_MEMO() {
    this.router.navigate(['vp-credit-debit-memo']);
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
}