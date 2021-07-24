import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from '../../shared/services/log/log.service';
import { IStudent } from '../student.interface';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: IStudent[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  student: IStudent;
  private dataIsValid: boolean;
  showAddStudentForm: boolean;

  constructor(
    private studentService: StudentService,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.showAddStudentForm = false;

    this.initStudentsChangedSubscription();
    this.studentService.studentListChanged.next(true);
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
          this.students = await this.studentService.getStudentList();
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
    this.showAddStudentForm = false;
  }

  editStudent(s: IStudent) {
    this.showAddStudentForm = true;
    this.student = s;
  }

  deleteStudent(student: IStudent) {
    if (
      confirm(`Really delete the student: ${student.fName + student.lName}?`)
    ) {
      this.studentService.removeStudent(student.id).subscribe({
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

  validate(s:IStudent=this.student): void {
    if (
      s.fName &&
      s.fName.length >= 2 &&
      s.lName &&
      s.lName.length >= 2 &&
      s.birthId &&
      s.birthId.length >= 8
    ) {
      this.dataIsValid = true;
    } else {
      this.dataIsValid = false;
    }
  }

  isValid(s:IStudent=this.student): boolean {
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
          this.getDataStudentArrayFromCSVFile(csvStudentArray, headersRow.length);
        };
        reader.onerror = function () {  
          console.log('error is occured while reading file!');  
        };
      } else {  
        alert("Please import valid .csv file.");  
      }  
    }
  }

  getDataStudentArrayFromCSVFile(csvStudentArray: any, headerLength: number) {    
    for (let i = 1; i < csvStudentArray.length; i++) {
      let curruntStudent = (<string>csvStudentArray[i]).split(',');
      if (curruntStudent.length == headerLength) {
        let newStudent: IStudent = this.initializeStudent();
        let len: number = 3;
        newStudent.fName = curruntStudent[headerLength-len].trim();
        newStudent.lName = curruntStudent[(headerLength-len)+1].trim();
        newStudent.birthId = curruntStudent[(headerLength-len)+2].trim();
  
        this.addStudent(newStudent);
      }
    }
    this.showAddStudentForm = false;
  }

  addStudent(s: IStudent): void{
    if (this.isValid(s)) {
      if (s.id === 0) {
        this.studentService.addStudent(s).subscribe({
          next: () => {
            this.reset();
            this.studentService.studentListChanged.next(true);
          },
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }

  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
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
