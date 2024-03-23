import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-cus-dashboard',
  templateUrl: './cus-dashboard.component.html',
  styleUrls: ['./cus-dashboard.component.css']
})
export class CusDashboardComponent {
  title: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  INQUIRY_DATA() {
    this.router.navigate(['inquiry-data']);
  }

  SALE_ORDER_DATA() {
    this.router.navigate(['sale-order-data']);
  }

  LIST_OF_DELIVERY() {
    this.router.navigate(['list-of-delivery']);
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