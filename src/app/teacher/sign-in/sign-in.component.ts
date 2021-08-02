import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Sign In';

  constructor(private authService: TeacherAuthService, private dialogRef: MatDialogRef<AuthComponent>) { }

  ngOnInit(): void {
  }

  signIn(signInForm: NgForm): void {
    if (signInForm && signInForm.valid) {
      const email = signInForm.form.value.email;
      const password = signInForm.form.value.password;

      this.authService.signIn(email, password);
      this.dialogRef.close();
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

}
