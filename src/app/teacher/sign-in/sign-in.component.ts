import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Sign In';

  constructor(
    private authService: TeacherAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signIn(signInForm: NgForm): void {
    if (signInForm && signInForm.valid) {
      const email = signInForm.form.value.email;
      const password = signInForm.form.value.password;

      this.authService.signIn(email, password).subscribe(() => {
        this.router.navigate(['welcome']);
      });
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
