import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignIn: boolean;

  constructor(private dialogRef: MatDialogRef<AuthComponent>) {}

  ngOnInit(): void {
    this.isSignIn = true;
  }

  toggleForm(): void {
    // const container = document.querySelector('.container');
    // container.classList.toggle('active');
    this.isSignIn = !this.isSignIn;
    console.log('The value of isSignIn = ' + this.isSignIn);
    // this.dialogRef.close();
  }
}
