import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-ep-login',
  templateUrl: './ep-login.component.html',
  styleUrls: ['./ep-login.component.css']
})
export class EpLoginComponent implements OnInit {
  private url = 'http://localhost:3000/ep-login';
  public showPassword: boolean = false;
  public isLoading: boolean = false;

  form = new FormGroup({
    EmployeeID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get loginData() {
    return this.form.controls;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: AppServiceService
  ) {}

  ngOnInit(): void {}

  Onsubmit() {
    this.isLoading = true;
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http
      .post(this.url, JSON.stringify(this.form.value), { headers: headers })
      .subscribe(
        (data: any) => {
          console.log('This is from login');
          const check = data.result;
          if (check == 'LOGIN SUCCESS!!') {
            this.router.navigate(['ep-dashboard']);
          } else {
            alert('Login Failed! Please check the User ID and Password.');
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.log('Error occurred during login:', error);
          this.isLoading = false;
        }
      );
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
