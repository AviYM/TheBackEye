import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/shared/services/log/log.service';
import { ILesson } from '../lesson.interface';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent implements OnInit, OnDestroy {
  lessons: ILesson[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(
    private lessonService: LessonService,
    private logger: LogService
  ) {}

  ngOnInit() {
    this.initLessonChangedSubscription();
    this.lessonService.lessonListChanged.next(true);

    // this.sub = this.lessonService.getLessons(true).subscribe({
    //   next: lessonsData => {
    //     this.lessons = lessonsData;
    //   },
    //   error: err => this.errorMessage = err
    // });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  initLessonChangedSubscription() {
    this.lessonService.lessonListChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          this.lessons = await this.lessonService.getLessonList();
        }
      }
    );
  }

  onDelete(lesson: ILesson) {
    if (confirm(`Really delete the lesson: ${lesson.title}?`)) {
      this.lessonService.removeLesson(lesson.id).subscribe({
        next: () => {
          this.logger.log('the lesson No. ' + lesson.id + ' deleted');
          this.lessonService.lessonListChanged.next(true);
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }
}
