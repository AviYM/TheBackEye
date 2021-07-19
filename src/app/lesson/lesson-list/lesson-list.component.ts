import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/shared/services/log/log.service';
import { ILesson } from '../lesson.interface';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit, OnDestroy {

  public lessons: ILesson[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private lessonService: LessonService, private logger: LogService) { }

  ngOnInit(): void {
    this.sub = this.lessonService.getLessons(true).subscribe({
      next: lessonsData => {
        this.lessons = lessonsData;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDelete(id: number) {
    this.lessonService.removeLesson(id).subscribe({
      next: () => this.logger.log("the lesson No. " + id + " deleted"),
      error: (err) => (this.errorMessage = err),
    });
  }

}
