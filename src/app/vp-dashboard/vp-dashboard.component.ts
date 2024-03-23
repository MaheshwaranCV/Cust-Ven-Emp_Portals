import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-vp-dashboard',
  templateUrl: './vp-dashboard.component.html',
  styleUrls: ['./vp-dashboard.component.css']
})
export class VPDashboardComponent {
  tile: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  VEN_FIN_DETAILS() {
    this.router.navigate(['ven-fin-details']);
  }

  VEN_PROFILE() {
    this.router.navigate(['ven-profile']);
  }

  VEN_DASHBOARD() {
    this.router.navigate(['ven-dashboard']);
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