import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStudent } from '../student.interface';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  
  errorMessage: string;
  student: IStudent;

  showAddStudent: boolean;
  private dataIsValid: boolean;

  constructor(private studentService: StudentService, private router: Router,) { }

  ngOnInit(): void {
    this.student = this.initializeStudent();
  }

  saveStudent() {
    if (this.isValid()) {
      if (this.student.id === 0) {
        this.studentService.addStudent(this.student).subscribe({
          next: (retNewStudent) => this.onSaveComplete(retNewStudent),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.studentService.editStudent(this.student).subscribe({
          next: (retNewStudent) => this.onSaveComplete(retNewStudent),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(s: IStudent): void {
    this.reset();
    this.studentService.studentListChanged.next(true);
  }

  reset(): void {
    this.dataIsValid = false;
    // this.currentStudent = null;
    // this.originalStudent = null;
  }

  validate(): void {
    if (
      this.student.fName &&
      this.student.fName.length >= 2 &&
      this.student.lName &&
      this.student.lName.length >= 2 &&
      this.student.birthId &&
      this.student.birthId.length >= 8
    ) {
      this.dataIsValid = true;
    } else {
      this.dataIsValid = false;
    }
  }

  isValid(): boolean {
    this.validate();
    return this.dataIsValid;
  }

  private initializeStudent(): IStudent {
    // Return an initialized object
    return {
      id: 0,
      fName: null,
      lName: null,
      birthId: null,
      password: null
    };
  }

}
