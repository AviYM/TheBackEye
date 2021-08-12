import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeacherAuthService } from 'src/app/teacher/teacher-auth.service';
import {
  LessonListChangedAction,
  LessonService,
} from '../../../lesson/lesson.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTeacherName: string;
  sub!: Subscription;

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private teacherService: TeacherAuthService
  ) {}

  ngOnInit(): void {
    this.initCurrentTeacherChangedSubscription();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initCurrentTeacherChangedSubscription(): void {
    this.sub = this.teacherService.currentTeacherChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          this.currentTeacherName = this.teacherService.getCurrentTeacherFirstName();
        }
      }
    );
  }

  toggleSideBar() {
    this.toggleSidebar.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  onAddClick(): void {
    this.router.navigate(['/lesson', 0, 'edit']);
  }

  onLogoClick(): void {
    this.lessonService.lessonListChanged.next(LessonListChangedAction.Refresh);
    this.router.navigate(['/welcome']);
  }

  signOut(): void {
    this.teacherService.signOut();
    this.teacherService.currentTeacherChanged.next(true);
    this.router.navigate(['/welcome']);
  }
}
