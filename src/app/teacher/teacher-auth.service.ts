import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { ITeacher } from './teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherAuthService {
  currentTeacher: ITeacher;

  public currentTeacherChanged: Subject<boolean>;

  constructor(private logger: LogService, private http: HttpService) {
    this.currentTeacherChanged = new Subject<boolean>();
  }

  signIn(email: string, password: string): void {
    this.logger.info('Email: ' + email + '; Password: ' + password);

    // this.currentTeacher = this.http. TODO fetch the teacher's details.

    this.currentTeacher = {
      id: 0,
      fName: email.split('@')[0],
      lName: '',
      email: email,
      password: password,
    };

    this.currentTeacherChanged.next(true);
  }

  getCurrentTeacherFirstName(): string {
    if(this.currentTeacher) {
      return this.currentTeacher.fName;
    }
    return "";
  }

  signOut(): void {
    this.currentTeacher = null;
  }
}
