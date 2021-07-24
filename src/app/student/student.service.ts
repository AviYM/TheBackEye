import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { IStudent } from './student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'students';

  private students: IStudent[] = [];
  errorMessage: string = '';

  public studentListChanged: Subject<boolean>;

  constructor(private http: HttpService, private logger: LogService) {
    this.studentListChanged = new Subject<boolean>();
  }

  public async getStudentList(): Promise<IStudent[]> {
    this.logger.debug('The StudentService.getStudentList() is called');

    return this.http.read<IStudent[]>(this.baseUrl).pipe(
      tap(data => this.students = data),
      catchError(this.handleError)
    ).toPromise();
  }

  public getSingleStudent(id: number): Observable<IStudent> {
    this.logger.debug('The StudentService.getSingleStudent(' + id + ') is called');
    if (id === 0) {
      return of(this.initializeStudent());
    }

    return of(this.students.find((element) => element.id === id));
  }

  public addStudent(newStudent: IStudent): Observable<IStudent> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The StudentService.addStudent() is called');
    newStudent.id = null;

    return this.http.create<IStudent>(this.baseUrl, newStudent, headers).pipe(
      tap((data) => this.logger.log('addStudent: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public editStudent(student: IStudent): Observable<IStudent> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The StudentService.editStudent() is called');
    this.logger.info(student);
    const url = `${this.baseUrl}/${student.id}`;

    return this.http.update<IStudent>(url, student, headers).pipe(
      tap(() => this.logger.log('editStudent: ' + student.id)),
      map(() => student),
      catchError(this.handleError)
    );
  }

  public removeStudent(id: number): Observable<IStudent> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The StudentService.removeStudent() is called');

    return this.http.delete<IStudent>(this.baseUrl, id, headers).pipe(
      tap(() => this.logger.log('removeStudent: ' + id)),
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
