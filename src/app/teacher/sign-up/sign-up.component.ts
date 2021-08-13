import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IPerson } from '../../shared/person.interface';
import { TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Sign Up';

  constructor(private authService: TeacherAuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp(signUpForm: NgForm): void {
    if (signUpForm && signUpForm.valid) {
      let formValue = signUpForm.form.value;

      if (formValue.password !== formValue.cPwd) {
        this.errorMessage = 'Password confirmation failed, please try again.';
        return;
      }

      let newTeacher: IPerson = this.initializePerson();
      newTeacher.firstName = formValue.fName;
      newTeacher.lastName = formValue.lName;
      newTeacher.email = formValue.email;
      newTeacher.password = formValue.password;

      this.authService.signUp(newTeacher).subscribe(
        () => this.router.navigate(['/welcome'])
      );
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

  private initializePerson(): IPerson {
    return {
      id: 0,
      birthId: '',
      password: null,
      type: 0,
      firstName: null,
      lastName: null,
      email: null,
      token: '',
    };
  }
}
