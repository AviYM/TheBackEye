import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { TeacherAuthService } from '../teacher-auth.service';
import { ITeacher } from '../teacher.interface'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Sign Up';

  constructor(private authService: TeacherAuthService, private dialogRef: MatDialogRef<AuthComponent>) { }

  ngOnInit(): void {
  }

  signUp(signUpForm: NgForm): void {
    let formValue = signUpForm.form.value;
    if (signUpForm && signUpForm.valid && (formValue.password === formValue.cpwd)) {
      let newTeacher: ITeacher = {
        id: 0,
        fName: formValue.fName,
        lName: formValue.lName,
        email: formValue.email,
        password: formValue.password
      }
      console.log(formValue);
      console.log(newTeacher);
      this.authService.signUp(newTeacher);
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
    this.dialogRef.close();
  }
}
