import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-ep-dashboard',
  templateUrl: './ep-dashboard.component.html',
  styleUrls: ['./ep-dashboard.component.css']
})
export class EpDashboardComponent {
  tile: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  EMP_PROFILE() {
    this.router.navigate(['emp-profile']);
  }

  EMP_LEAVE() {
    this.router.navigate(['emp-leave']);
  }

  EMP_PAYSLIP() {
    this.router.navigate(['emp-payslip']);
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
}