import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ven-profile',
  templateUrl: './ven-profile.component.html',
  styleUrls: ['./ven-profile.component.css']
})
export class VenProfileComponent {
  loading: boolean = true;
  Profile: any;


  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}





  ngOnInit(): void {
    this.loading = true;

    this.http.post("http://localhost:3000/ven-profile", "{}").subscribe((resp: any) => {

      this.Profile = resp['SOAP:Envelope']['SOAP:Body']['ns0:ZVP_PROFILE_MAHESH_FM.Response']['EX_VENDOR_PROFILE'];

      console.log(this.Profile)
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
        this.router.navigate(['/vp-login']);
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