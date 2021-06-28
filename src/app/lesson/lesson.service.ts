import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpService, private logger: LogService) { }

  getLessons() {
    this.http.getItems('assets/mock_data/MOCK_DATA_lessons.json');
  }
}
