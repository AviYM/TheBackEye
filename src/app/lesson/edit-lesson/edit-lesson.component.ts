import { Component, OnInit } from '@angular/core';
import { LogService } from '../../shared/services/log/log.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {

  constructor(private logger: LogService) { }

  ngOnInit(): void {
    this.logger.log('The dialog was opened')
  }

}

