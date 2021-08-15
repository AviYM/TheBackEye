import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPerson } from '../shared/person.interface';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';

export enum currentTeacherChangedAction {
  SignOut = 0,
  Init,
  SignIn,
}

@Injectable({
  providedIn: 'root',
})
export class TeacherAuthService {
  private baseUrl = 'Person';

  private currentTeacher: IPerson;

  get isSignIn(): boolean {
    if (this.currentTeacher) {
      return true;
    }
    return false;
  }

  get teacher(): IPerson {
    return this.currentTeacher;
  }

  public currentTeacherChanged: Subject<number>;

  constructor(private logger: LogService, private http: HttpService) {
    this.currentTeacherChanged = new Subject<number>();
    this.currentTeacher = null;
  }

  // Like getPerson func in another services.
  signIn(email: string, password: string): Observable<IPerson> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': '' };
    this.logger.info('Email: ' + email + '; Password: ' + password);

    return this.http.create<IPerson>(this.baseUrl + '/GetTeacher/' + email, '"' + password + '"', headers).pipe(
      tap((data) => {
        this.logger.log('Teacher signIn: ' + JSON.stringify(data));
        this.currentTeacher = data;
        this.currentTeacherChanged.next(currentTeacherChangedAction.Init);
      }),
      catchError(this.handleError)
    );
  }

  // Like addPerson func in another services.
  signUp(newTeacher: IPerson): Observable<IPerson> {
    this.logger.info(newTeacher);

    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': '' };

    return this.http.create<IPerson>(this.baseUrl, newTeacher, headers).pipe(
      tap((data) => {
        this.logger.log('Teacher signUp: ' + JSON.stringify(data));
        this.currentTeacher = data;
        this.currentTeacherChanged.next(currentTeacherChangedAction.Init);
      }),
      catchError(this.handleError)
    );
  }

  editTeacher(teacher: IPerson) { // : Observable<IPerson>
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getCurrentTeacherToken()}` };

    return this.http.update<IPerson>(this.baseUrl, teacher, headers).pipe(
      tap((data) => {
        this.logger.log('editTeacher: ' + teacher.id)
        this.currentTeacher = data;
        this.currentTeacherChanged.next(currentTeacherChangedAction.Init);
      }),
      map(() => teacher),
      catchError(this.handleError)
    );
  }

  removeTeacher(id: number): Observable<IPerson> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getCurrentTeacherToken()}` };
    this.logger.debug('The TeacherService.removeTeacher() is called');

    return this.http.delete<IPerson>(this.baseUrl, id, headers).pipe(
      tap(() => this.logger.log('deleteTeacher: ' + id)),
      catchError(this.handleError)
    );
  }

  getCurrentTeacherFirstName(): string {
    if(this.currentTeacher) {
      return this.currentTeacher.firstName;
    }
    return '';
  }

  getCurrentTeacherToken(): string {
    if (this.currentTeacher) {
      return this.currentTeacher.token;
    }
    return '';
  }

  getCurrentTeacherId(): number | null {
    if (!this.currentTeacher) {
      return null;
    }
    return this.currentTeacher.id;
  }

  signOut(): void {
    this.currentTeacher = null;
    this.currentTeacherChanged.next(currentTeacherChangedAction.SignOut);
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

  // private initializePerson(): IPerson {
  //   return {
  //     id: null,
  //     birthId: null,
  //     password: null,
  //     type: 0,
  //     firstName: null,
  //     lastName: null,
  //     email: null,
  //     token: null
  //   }
  // }
}
