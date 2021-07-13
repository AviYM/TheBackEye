import { Component } from '@angular/core';
import { EditLessonComponent } from './lesson/edit-lesson/edit-lesson.component';
import { LogService } from './shared/services/log/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'teacher-app';
  isClicked: boolean;
  showModal: boolean;

  constructor(private logger: LogService) {
  }

}

