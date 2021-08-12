import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LessonListChangedAction, LessonService } from '../../lesson/lesson.service';
import { TeacherAuthService } from '../../teacher/teacher-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  sub: Subscription;

  isSideBarOpen: boolean;

  constructor(private teacherService: TeacherAuthService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.isSideBarOpen = false;
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initSubscriptions(): void {
    this.sub = this.teacherService.currentTeacherChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          let currentTeacherName = this.teacherService.getCurrentTeacherFirstName();
          let len = this.lessonService.getLessonListLength();
          if(currentTeacherName && len > 0) {
            this.isSideBarOpen = true;
          }
        }
      }
    );
    this.sub.add(this.lessonService.lessonListChanged.subscribe(
      async (isChanged: number) => {
      if (isChanged == LessonListChangedAction.Reload) {
        let currentTeacherName = this.teacherService.getCurrentTeacherFirstName();
        let len = (await this.lessonService.getLessonList()).length;
        if(!currentTeacherName || len == 0) {
          this.isSideBarOpen = false;
        }
      }
    }));
  }

  sideBarToggler() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
