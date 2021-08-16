import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LessonListChangedAction, LessonService } from '../../lesson/lesson.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  sub: Subscription;

  isSideBarOpen: boolean;

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.isSideBarOpen = false;
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initSubscriptions(): void {
    this.sub = this.lessonService.lessonListChanged.subscribe(
      async (isChanged: number) => {
      if (isChanged === LessonListChangedAction.Reload) {
        let len = (await this.lessonService.getLessonList()).length;
        if(len > 0) {
          this.isSideBarOpen = true;
        }
      }
    });
  }

  sideBarToggler() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
