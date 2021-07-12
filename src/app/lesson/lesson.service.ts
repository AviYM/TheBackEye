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
}
