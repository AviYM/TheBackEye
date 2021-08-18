import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeacherAuthService } from 'src/app/teacher/teacher-auth.service';
import { environment } from 'src/environments/environment';
import { LessonListChangedAction, LessonService } from '../../lesson/lesson.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  sub: Subscription;

  isSideBarOpen: boolean;

  constructor(private authService: TeacherAuthService, private lessonService: LessonService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get(`${environment.api.baseUrl}/IsAlive`).subscribe((resp) => {
    //   console.log(resp);
    // });

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
        let res = await this.lessonService.getLessonList();
        if (res) {
          let len = res.length;
          if(len > 0) {
            this.isSideBarOpen = true;
          }
        }  
      }
    });
  }

  sideBarToggler() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
