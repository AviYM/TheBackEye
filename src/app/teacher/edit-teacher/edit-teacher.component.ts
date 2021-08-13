import { Component, OnInit } from '@angular/core';
import { $$ } from 'protractor';
import { Subscription } from 'rxjs';
import { IPerson } from '../../shared/person.interface';
import { TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  pageTitle: string = 'Account Details';
  sub!: Subscription;
  errorMessage: string = '';
  teacher: IPerson;
  private dataIsValid: boolean;
 
  constructor(private teacherService: TeacherAuthService) { }

  ngOnInit(): void {
    this.dataIsValid = false;
    this.teacher = this.teacherService.teacher
  }

  validate(t: IPerson = this.teacher): void {
    if (
      t.firstName &&
      t.firstName.length >= 2 &&
      t.lastName &&
      t.lastName.length >= 2 &&
      t.email &&
      t.password &&
      t.password.length >= 8
    ) {
      this.dataIsValid = true;
    } else {
      this.dataIsValid = false;
    }
  }

  isValid(t: IPerson = this.teacher): boolean {
    this.validate(t);
    return this.dataIsValid;
  }

  saveChanges() {

  }
}
