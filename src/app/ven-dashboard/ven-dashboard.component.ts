import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-ven-dashboard',
  templateUrl: './ven-dashboard.component.html',
  styleUrls: ['./ven-dashboard.component.css']
})
export class VenDashboardComponent {
  title: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  VP_REQ_QUOTATION() {
    this.router.navigate(['vp-req-quotation']);
  }
  VP_PURCHASE_ORDER() {
    this.router.navigate(['vp-purchase-order']);
  }

  VP_GOODS_RECEIPT() {
    this.router.navigate(['vp-goods-receipt']);
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