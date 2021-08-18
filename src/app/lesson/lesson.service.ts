import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { currentTeacherChangedAction, TeacherAuthService } from '../teacher/teacher-auth.service';
import { ILesson } from './lesson.interface';

export enum LessonListChangedAction {
  Init = 1,
  Reload,
  Refresh,
}

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private baseUrl = 'Lesson';
  teacherId: number;

  private lessons: ILesson[] = [];
  errorMessage: string = '';

  public lessonListChanged: Subject<number>;

  constructor(
    private http: HttpService,
    private logger: LogService,
    private teacherService: TeacherAuthService
  ) {
    this.lessonListChanged = new Subject<number>();
    this.teacherService.currentTeacherChanged.subscribe((status: number) => {
      if (status === currentTeacherChangedAction.Init) {
        this.teacherId = this.teacherService.getCurrentTeacherId();
        this.lessonListChanged.next(LessonListChangedAction.Reload);
      } else if (status === currentTeacherChangedAction.SignOut) {
        this.teacherId = null;
      }
    });
  }

  public getLessons(isRefresh?: boolean): Observable<ILesson[]> {
    this.logger.debug('The LessonService.getLessons() is called');
    if (!this.teacherId) {
      return null;
    }

    if (!isRefresh) {
      return of(this.lessons);
    } else {
      return this.http
        .read<ILesson[]>(this.baseUrl + '/AllLessons/' + this.teacherId)
        .pipe(
          tap((data) => {
            this.logger.log('getLessons: ' + JSON.stringify(data));
            this.saveLessons(data);
          }),
          catchError(this.handleError)
        );
    }
  }

  private saveLessons(lessonList: ILesson[]) {
    lessonList.forEach(
      (l) =>
        (l.dayOfWeek =
          l.dayOfWeek[0].toUpperCase() + l.dayOfWeek.substr(1).toLowerCase())
    );
    this.lessons = lessonList;
    return lessonList;
  }

  public async getLessonList(): Promise<ILesson[]> {
    this.logger.debug('The LessonService.getLessonList() is called');
    if (!this.teacherId) {
      return null;
    }

    return this.http
      .read<ILesson[]>(this.baseUrl + '/AllLessons/' + this.teacherId)
      .toPromise()
      .then((lessonList) => this.saveLessons(lessonList));
  }

  public getSingleLesson(id: number): Observable<ILesson> {
    this.logger.debug('The LessonService.getSingleLesson(' + id + ') is called');
    if (!this.teacherId) {
      return null;
    }

    if (id === 0) {
      return of(this.initializeLesson());
    }

    if (this.lessons.length) {
      return of(this.lessons.find((element) => element.id === id));
    }
    return this.getLessons(true).pipe(
      map((lessons: ILesson[]) => lessons.find((element) => element.id === id))
    );
  }

  public getLessonHistory​(lessonId: number): Promise<Date[]> {
    this.logger.debug('The LessonService.getLessonHistory​() is called');
    if (!this.teacherId) {
      return null;
    }

    return this.http
      .read<Date[]>('Measurement/GetLessonHistory/' + lessonId).toPromise();
  }

  private checkDatesFormat(lesson: ILesson): ILesson {
    if (!lesson) {
      return null;
    }

    if (lesson.startTime instanceof Date) {
      lesson.startTime = lesson.startTime.toISOString();
    } else {
      lesson.startTime = new Date(lesson.startTime).toISOString();
    }
    if (lesson.endTime instanceof Date) {
      lesson.endTime = lesson.endTime.toISOString();
    } else {
      lesson.endTime = new Date(lesson.endTime).toISOString();
    }
    if (lesson.breakStart instanceof Date) {
      lesson.breakStart = lesson.breakStart.toISOString();
    }
    if (lesson.breakEnd instanceof Date) {
      lesson.breakEnd = lesson.breakEnd.toISOString();
    }

    return lesson;
  }

  public addLesson(newLesson: ILesson): Observable<ILesson> {
    this.logger.debug('The LessonService.addLesson() is called');
    if (!this.teacherId) {
      return null;
    }

    // let validLesson = this.checkDatesFormat(newLesson);
    this.logger.log(newLesson); //******************************************/

    return this.http.create<ILesson>(this.baseUrl, newLesson).pipe(
      tap((data) => this.logger.log('addLesson: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public editLesson(lesson: ILesson): Observable<ILesson> {
    this.logger.debug('The LessonService.editLesson() is called');
    if (!this.teacherId) {
      return null;
    }

    return this.http.update<ILesson>(this.baseUrl, lesson).pipe(
      tap(() => this.logger.log('editLesson: ' + lesson.id)),
      map(() => lesson),
      catchError(this.handleError)
    );
  }

  public removeLesson(id: number): Observable<ILesson> {
    this.logger.debug('The LessonService.removeLesson() is called');
    if (!this.teacherId) {
      return null;
    }

    return this.http.delete<ILesson>(this.baseUrl, id).pipe(
      tap(() => this.logger.log('deleteLesson: ' + id)),
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

  getLessonListLength(): number {
    if (this.lessons.length) {
      return this.lessons.length;
    }
    let len = 0;
    this.getLessonList().then((data) => (len = data.length));
    return len;
  }

  private initializeLesson(): ILesson {
    // Return an initialized object
    return {
      id: 0,
      personId: this.teacherId,
      name: null,
      description: '',
      platform: null,
      link: null,
      isActive: false,
      dayOfWeek: null,
      startTime: new Date(),
      endTime: new Date(),
      breakStart: new Date(),
      breakEnd: new Date(),
      maxLate: null,
      classCode: '',
    };
  }
}
