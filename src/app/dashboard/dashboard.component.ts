import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tile: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  FIN_DETAILS() {
    this.router.navigate(['fin-details']);
  }

  CUS_PROFILE() {
    this.router.navigate(['cus-profile']);
  }

  CUS_DASHBOARD() {
    this.router.navigate(['cus-dashboard']);
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