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
    if (this.isThereTeacherInStorage()) {
      this.currentTeacher = JSON.parse(localStorage.getItem('user'));
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
  public signIn(email: string, password: string): Observable<IPerson> {
    this.logger.info('Email: ' + email + '; Password: ' + password);

    return this.http.create<IPerson>(this.baseUrl + '/GetTeacher/' + email, '"' + password + '"').pipe(
      tap((data) => {
        if (data && data.token) {
          this.logger.log('Teacher signIn: ' + JSON.stringify(data));
          this.onSignInComplete(data);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Like addPerson func in another services.
  public signUp(newTeacher: IPerson): Observable<IPerson> {
    this.logger.info(newTeacher);

    return this.http.create<IPerson>(this.baseUrl, newTeacher).pipe(
      tap((data) => {
        if (data && data.token) {
          this.logger.log('Teacher signUp: ' + JSON.stringify(data));
          this.onSignInComplete(data);
        }
      }),
      catchError(this.handleError)
    );
  }

  private onSignInComplete(data: IPerson) {
    this.saveToStorage(data);
    this.currentTeacher = data;
    this.currentTeacher.token = '';
    this.currentTeacherChanged.next(currentTeacherChangedAction.Init);
  }

  private saveToStorage(p: IPerson) {
    this.setSession(p.token);
    this.saveTeacher(p);
  }

  private setSession(token: string) {
    localStorage.setItem('id_token', token);
  }

  private saveTeacher(p: IPerson) {
    localStorage.setItem('user', JSON.stringify(p));
  }

  private isThereTeacherInStorage(): boolean {
    if(localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  public signOut(): void {
    this.currentTeacher = null;
    this.currentTeacherChanged.next(currentTeacherChangedAction.SignOut);

    this.cleanStorage();
  }

  private cleanStorage() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('user');
  }

  public editTeacher(teacher: IPerson): Observable<IPerson> {
    return this.http.update<IPerson>(this.baseUrl, teacher).pipe(
      tap((data) => {
        this.logger.log('editTeacher: ' + teacher.id)
        this.currentTeacher = data;
        this.currentTeacherChanged.next(currentTeacherChangedAction.Init);
      }),
      map(() => teacher),
      catchError(this.handleError)
    );
  }

  public removeTeacher(id: number): Observable<IPerson> {
    this.logger.debug('The TeacherService.removeTeacher() is called');

    return this.http.delete<IPerson>(this.baseUrl, id).pipe(
      tap(() => this.logger.log('deleteTeacher: ' + id)),
      catchError(this.handleError)
    );
  }

  public getCurrentTeacherFirstName(): string {
    if(this.currentTeacher) {
      return this.currentTeacher.firstName;
    }
    return '';
  }

  public getCurrentTeacherId(): number | null {
    if (!this.currentTeacher) {
      return null;
    }
    return this.currentTeacher.id;
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
