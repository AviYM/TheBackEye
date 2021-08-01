import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignIn: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isSignIn = true;
  }

  toggleForm(): void {
    this.isSignIn = !this.isSignIn;
    console.log('The value of isSignIn = ' + this.isSignIn);
  }
}
