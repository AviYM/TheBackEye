import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPerson } from '../../shared/person.interface';
import { LogService } from '../../shared/services/log/log.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: IPerson[] = [];
  sub!: Subscription;
  errorMessage: string = '';
  lessonId: number;
  student: IPerson;
  private dataIsValid: boolean;
  showAddStudentForm: boolean;

  constructor(
    private studentService: StudentService,
    private logger: LogService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    this.showAddStudentForm = false;
    this.lessonId = +this.route.snapshot.paramMap.get('id');

    //this.students = await this.route.snapshot.data.studentResolver;
    this.students = await this.studentService.getStudentList(this.lessonId);

    this.initStudentsChangedSubscription();
    this.studentService.studentListChanged.next(true);

    // In case of routing from the student-list of one lesson 
    // to the student-list of another lesson directly.
    this.route.params.subscribe(params => {
      this.lessonId = params['id'];
      this.logger.log("URL id has changed")
      this.initStudentsChangedSubscription();
      this.studentService.studentListChanged.next(true);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initStudentsChangedSubscription() {
    this.sub = this.studentService.studentListChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          this.students = [];
          this.students = await this.studentService.getStudentList(this.lessonId);
        }
      }
    );
  }

  addNewStudent() {
    this.showAddStudentForm = true;
    this.student = this.initializeStudent();
  }

  saveStudent() {
    if (this.isValid()) {
      if (this.student.id === 0) {
        this.studentService.addStudent(this.student).subscribe({
          next: (retNewStudent) => {
            this.studentService
              .addStudentToLesson(this.lessonId, retNewStudent.id)
              .subscribe({
                next: () => this.onSaveComplete(retNewStudent),
                error: (err) => (this.errorMessage = err),
              });
          },
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

  onSaveComplete(s: IPerson): void {
    this.reset();
    this.studentService.studentListChanged.next(true);
    this.showAddStudentForm = false;
  }

  editStudent(s: IPerson) {
    this.showAddStudentForm = true;
    this.student = JSON.parse(JSON.stringify(s));
  }

  onCancelClick() {
    this.showAddStudentForm = false;
    this.student = null;
  }

  deleteStudent(student: IPerson) {
    if (
      confirm(
        `Really delete the student: ${student.firstName + student.lastName}?`
      )
    ) {
      this.studentService.removeStudent(student.id, this.lessonId).subscribe({
        next: () => {
          this.logger.log('the student No. ' + student.id + ' deleted');
          this.studentService.studentListChanged.next(true);
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  reset(): void {
    this.dataIsValid = false;
  }

  validate(s: IPerson = this.student): void {
    if (
      s.firstName &&
      s.firstName.length >= 2 &&
      s.lastName &&
      s.lastName.length >= 2 &&
      s.birthId &&
      s.birthId.length >= 8
    ) {
      this.dataIsValid = true;
    } else {
      this.dataIsValid = false;
    }
  }

  isValid(s: IPerson = this.student): boolean {
    this.validate(s);
    return this.dataIsValid;
  }

  public fileChanged($event: any) {
    let files = $event.target.files;
    this.logger.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      if (this.isValidCSVFile(file)) {
        this.logger.log(file.name);
        this.logger.log(file.size);
        this.logger.log(file.type);
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          let csvStudentArray = (reader.result as string).split(/\r\n|\n/);
          this.logger.log(csvStudentArray);

          let headersRow = this.getHeaderArray(csvStudentArray);
          this.getDataStudentArrayFromCSVFile(
            csvStudentArray,
            headersRow.length
          );
        };
        reader.onerror = function () {
          console.log('error is occured while reading file!');
        };
      } else {
        alert('Please import valid .csv file.');
      }
    }
  }

  getDataStudentArrayFromCSVFile(csvStudentArray: any, headerLength: number) {
    for (let i = 1; i < csvStudentArray.length; i++) {
      let curruntStudent = (<string>csvStudentArray[i]).split(',');
      if (curruntStudent.length == headerLength) {
        let newStudent: IPerson = this.initializeStudent();
        let len: number = 3;
        newStudent.firstName = curruntStudent[headerLength - len].trim();
        newStudent.lastName = curruntStudent[headerLength - len + 1].trim();
        newStudent.birthId = curruntStudent[headerLength - len + 2].trim();

        this.addStudent(newStudent);
      }
    }
    this.showAddStudentForm = false;
  }

  addStudent(s: IPerson): void {
    if (this.isValid(s)) {
      if (s.id === 0) {
        this.studentService.addStudent(s).subscribe({
          next: (retNewStudent) => {
            this.studentService
              .addStudentToLesson(this.lessonId, retNewStudent.id)
              .subscribe({
                next: () => {
                  this.reset();
                  this.studentService.studentListChanged.next(true);
                },
                error: (err) => (this.errorMessage = err),
              });
          },
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  private initializeStudent(): IPerson {
    // Return an initialized object
    return {
      id: 0,
      birthId: null,
      password: '',
      type: 1,
      firstName: null,
      lastName: null,
      email: '',
      token: '',
    };
  }
}
