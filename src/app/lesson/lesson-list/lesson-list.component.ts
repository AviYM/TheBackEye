import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogService } from '../../shared/services/log/log.service';
import { SelectedLesson } from '../lesson.interface';
import { LessonListChangedAction, LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent implements OnInit, OnDestroy {
  lessons: SelectedLesson[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(
    private lessonService: LessonService,
    private logger: LogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initLessonChangedSubscription();
    this.lessonService.lessonListChanged.next(LessonListChangedAction.Reload);

    // this.sub = this.lessonService.getLessons(true).subscribe({
    //   next: lessonsData => {
    //     this.lessons = lessonsData;
    //   },
    //   error: err => this.errorMessage = err
    // });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initLessonChangedSubscription() {
    this.lessonService.lessonListChanged.subscribe(
        async (isChanged: number) => {
        if (isChanged === LessonListChangedAction.Reload) {
          let lessonList = await this.lessonService.getLessonList();
          if (lessonList) {
            this.lessons = [];
            lessonList.forEach((l) => {
              this.lessons.push({
                lesson: l,
                isSelected: false,
              });
            });
          }
        } else if(isChanged === LessonListChangedAction.Refresh) {
          this.lessons.forEach((lesson) => {
            if (lesson.isSelected) {
              lesson.isSelected = false;
            }
          });
        }
      }
    );
  }

  onLessonClick(lessonId: number, index: number) {
    this.lessons.forEach((lesson) => {
      if (lesson.isSelected) {
        lesson.isSelected = false;
      }
    });
    this.lessons[index].isSelected = true;
    this.router.navigate(['/lesson', lessonId]);
  }

  onDelete(sl: SelectedLesson) {
    if (confirm(`Really delete the lesson: ${sl.lesson.name}?`)) {
      this.lessonService.removeLesson(sl.lesson.id).subscribe({
        next: () => {
          this.logger.log('the lesson No. ' + sl.lesson.id + ' deleted');
          this.lessonService.lessonListChanged.next(LessonListChangedAction.Reload);
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }
}
