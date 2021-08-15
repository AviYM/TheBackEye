import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $$ } from 'protractor';
import { Subscription } from 'rxjs';
import { IPerson } from '../../shared/person.interface';
import { currentTeacherChangedAction, TeacherAuthService } from '../teacher-auth.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss'],
})
export class EditTeacherComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Account Details';
  sub!: Subscription;
  errorMessage: string = '';
  teacher: IPerson;
  private dataIsValid: boolean;

  constructor(private teacherService: TeacherAuthService, private router: Router) {}

  ngOnInit(): void {
    this.dataIsValid = false;
    this.teacher = this.teacherService.teacher;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  validate(t: IPerson = this.teacher): void {
    if (
      t.firstName &&
      t.firstName.length >= 2 &&
      t.lastName &&
      t.lastName.length >= 2 &&
      t.email &&
      t.password &&
      t.password.length >= 4
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

  reset(): void {
    this.dataIsValid = false;
  }

  saveChanges() {
    if (this.isValid()) {
      this.teacherService.editTeacher(this.teacher).subscribe({
        next: () => {
          this.reset();
          this.teacherService.currentTeacherChanged.next(currentTeacherChangedAction.Init);
        },
        error: (err) => (this.errorMessage = err),
      });
      this.router.navigate(['welcome']);
    }
  }
}
