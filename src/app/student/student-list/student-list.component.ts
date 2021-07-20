import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from '../../shared/services/log/log.service';
import { IStudent } from '../student.interface';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: IStudent[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private studentService: StudentService, private logger: LogService) { }

  ngOnInit(): void {
    this.initStudentsChangedSubscription();
    this.studentService.studentListChanged.next(true);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initStudentsChangedSubscription() {
    this.studentService.studentListChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          this.students = await this.studentService.getStudentList();
        }
      }
    );
  }

  onDelete(student: IStudent) {
    if (confirm(`Really delete the student: ${student.fName + student.lName}?`)) {
      this.studentService.removeStudent(student.id).subscribe({
        next: () => {
          this.logger.log('the student No. ' + student.id + ' deleted');
          this.studentService.studentListChanged.next(true);
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }
}
