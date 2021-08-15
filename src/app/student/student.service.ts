import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPerson } from '../shared/person.interface';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { TeacherAuthService } from '../teacher/teacher-auth.service';
import { StudentLesson } from './student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private personUrl = 'Person';
  private studentLessonUrl = 'StudentLesson';
  private token: string;

  private students: IPerson[] = [];
  errorMessage: string = '';

  public studentListChanged: Subject<boolean>;

  constructor(private http: HttpService, private logger: LogService, private teacherService: TeacherAuthService) {
    this.studentListChanged = new Subject<boolean>();
    this.token = this.teacherService.getCurrentTeacherToken();
  }

  public async getStudentList(lessonId: number): Promise<IPerson[]> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The StudentService.getStudentList() is called');
    this.logger.debug("***********" + lessonId);
    return this.http.read<IPerson[]>(this.studentLessonUrl + '/' + lessonId, headers).pipe(
      tap(data => this.students = data),
      catchError(this.handleError)
    ).toPromise();
  }

  public getSingleStudent(id: number): Observable<IPerson> {
    this.logger.debug('The StudentService.getSingleStudent(' + id + ') is called');
    if (id === 0) {
      return of(this.initializePerson());
    }

    return of(this.students.find((element) => element.id === id));
  }

  public addStudent(newStudent: IPerson): Observable<IPerson> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The StudentService.addStudent() is called');

    return this.http.create<IPerson>(this.personUrl, newStudent, headers).pipe(
      tap((data) => this.logger.log('addStudent: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public addStudentToLesson(lessonId: number, personId: number) {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };

    let studentLesson: StudentLesson = {
      id: 0,
      lessonId: lessonId,
      personId: personId
    }
    return this.http.create<StudentLesson>(this.studentLessonUrl, studentLesson, headers).pipe(
      tap((data) => this.logger.log('addStudent: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public editStudent(student: IPerson): Observable<IPerson> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The StudentService.editStudent() is called');
    this.logger.info(student);
    const url = `${this.personUrl}`;

    return this.http.update<IPerson>(url, student, headers).pipe(
      tap(() => this.logger.log('editStudent: ' + student.id)),
      map(() => student),
      catchError(this.handleError)
    );
  }

  public removeStudent(personId: number, lessonId: number): Observable<StudentLesson> {
    if(personId <= 0 || lessonId <= 0) {
      return null;
    }

    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The StudentService.removeStudent() is called');

    return this.http.delete<StudentLesson>(this.studentLessonUrl, lessonId + '/' + personId, headers).pipe(
      tap(() => this.logger.log('removeStudent: ' + personId)),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    this.logger.error(err);
    return throwError(errorMessage);
  }

  private initializePerson(): IPerson {
    return {
      id: 0,
      birthId: null,
      password: '',
      type: 1,
      firstName: null,
      lastName: null,
      email: '',
      token: ''
    }
  }
}
