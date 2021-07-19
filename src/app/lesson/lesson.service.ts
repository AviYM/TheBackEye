import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { ILesson } from './lesson.interface';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl = 'lessons';

  lessons: ILesson[] = [];
  errorMessage: string = '';

  constructor(private http: HttpService, private logger: LogService) {}

  public getLessons(isRefresh?: boolean): Observable<ILesson[]> {
    this.logger.debug('The LessonService.getLessons() is called');

    if (!isRefresh) {
      return of(this.lessons);
    } else {
      return this.http.read<ILesson[]>(this.baseUrl).pipe(
        tap((data) => {
          // this.logger.log('getLessons: ' + JSON.stringify(data));
          this.lessons = data;
        }),
        catchError(this.handleError)
      );
    }
  }

  public getSingleLesson(id: number): Observable<ILesson> {
    this.logger.debug('The LessonService.getSingleLesson(' + id + ') is called');
    if (id === 0) {
      return of(this.initializeLesson());
    }

    // return of(this.lessons.find((element) => element.id === id));
    return this.getLessons(true).pipe(map((lessons: ILesson[]) => lessons.find((element) => element.id === id)));
  }

  public addLesson(newLesson: ILesson): Observable<ILesson> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The LessonService.addLesson() is called');
    newLesson.id = null;

    return this.http.create<ILesson>(this.baseUrl, newLesson, headers).pipe(
      tap((data) => this.logger.log('addLesson: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public editLesson(lesson: ILesson): Observable<ILesson> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The LessonService.editLesson() is called');
    this.logger.info(lesson);
    const url = `${this.baseUrl}/${lesson.id}`;

    return this.http.update<ILesson>(url, lesson, headers).pipe(
      tap(() => this.logger.log('editLesson: ' + lesson.id)),
      map(() => lesson),
      catchError(this.handleError)
    );
  }

  public removeLesson(id: number): Observable<ILesson> {
    const headers = { 'Content-Type': 'application/json' };
    this.logger.debug('The LessonService.removeLesson() is called');

    return this.http.delete<ILesson>(this.baseUrl, id, headers).pipe(
      tap((data) => this.logger.log('deleteLesson: ' + id)),
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

  private initializeLesson(): ILesson {
    // Return an initialized object
    return {
      id: 0,
      title: null,
      description: null,
      platform: null,
      link: null,
      isActive: null,
      dayOfWeek: null,
      startTime: null,
      endTime: null,
      startBreak: null,
      endBreak: null,
      maxLate: null,
    };
  }
}
