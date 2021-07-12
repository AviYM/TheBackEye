import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { ILesson } from './lesson.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpService, private logger: LogService) { }

  public getLessons(): Observable<ILesson[]> {
    this.logger.log("The LessonService.getLessons() is called");
    return this.http.read<ILesson[]>('MOCK_DATA_lessons.json');
  }

  public getSingleLesson(id: number): Observable<ILesson> {
    this.logger.log("The LessonService.getSingleLesson() is called");
    return this.http.read<ILesson>('MOCK_DATA_lessons.json/' + id);
  }

  public addLesson(newLesson: ILesson): Observable<ILesson> {
    this.logger.log("The LessonService.addLesson() is called");
    return this.http.create<ILesson>('MOCK_DATA_lessons.json', newLesson);
  }

  public editLesson(lesson: ILesson): Observable<ILesson> {
    this.logger.log("The LessonService.editLesson() is called");
    return this.http.update<ILesson>('MOCK_DATA_lessons.json', lesson);
  }

  public removeLesson(id: number): Observable<ILesson> {
    this.logger.log("The LessonService.removeLesson() is called");
    return this.http.delete<ILesson>('MOCK_DATA_lessons.json', id);
  }
}
