import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent {
  loading: boolean = true;
  Profiles: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}



  ngOnInit(): void {
    this.loading = true;

    this.http.post("http://localhost:3000/profile", "{}").subscribe((resp: any) => {

      this.Profiles = resp['soap-env:Envelope']['soap-env:Body']['n0:ZCP_PROFILE_MAHESH_FMResponse']['CUST_DATA'];

      console.log(this.Profiles)
      this.loading = false;


    });
  }

  formatNum(numString: string): string {
    const num = parseInt(numString, 10);
    return `${num}`;
  }

  printPage() {
    window.print();
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

  openNavigationConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        console.log('Navigating to Home Page...');
        this.router.navigate(['/starter-page']);
      }
    });
  }
}