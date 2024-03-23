import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-page',
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css']
})
export class StarterPageComponent {

  constructor(private router: Router) { }
  CP() {
    this.router.navigate(['login']);
  }
  VP() {
    this.router.navigate(['vp-login']);
  }
  EP() {
    this.router.navigate(['ep-login']);
  }
}