import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { ILesson } from './lesson.interface';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl = 'MOCK_DATA_lessons.json';

  constructor(private http: HttpService, private logger: LogService) {}

  public getLessons(): Observable<ILesson[]> {
    this.logger.log('The LessonService.getLessons() is called');
    return this.http.read<ILesson[]>(this.baseUrl);
  }

  public getSingleLesson(id: number): Observable<ILesson> {
    if (id === 0) {
      return of(this.initializeLesson());
    }
    this.logger.log('The LessonService.getSingleLesson() is called');
    //return this.http.read<ILesson>(this.baseUrl + '/' + id);
    return this.getLessons().pipe(
      map((lessons: ILesson[]) => lessons.find((l) => l.id === id))
    );
  }

  public addLesson(newLesson: ILesson): Observable<ILesson> {
    this.logger.log('The LessonService.addLesson() is called');
    return this.http.create<ILesson>(this.baseUrl, newLesson);
  }

  public editLesson(lesson: ILesson): Observable<ILesson> {
    this.logger.log('The LessonService.editLesson() is called');
    return this.http.update<ILesson>(this.baseUrl, lesson);
  }

  public removeLesson(id: number): Observable<ILesson> {
    this.logger.log('The LessonService.removeLesson() is called');
    return this.http.delete<ILesson>(this.baseUrl, id);
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
