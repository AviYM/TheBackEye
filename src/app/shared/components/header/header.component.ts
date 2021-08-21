import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/app/dashboard/signal-r.service';
import {
  currentTeacherChangedAction,
  TeacherAuthService,
} from 'src/app/teacher/teacher-auth.service';
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
  isLessonLive: boolean = false;
  eyeGif: string = '../../../assets/images/eye.gif';
  eyeHover: string = '../../../assets/images/eye_hover.gif';

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private teacherService: TeacherAuthService,
    private signalR: SignalRService
  ) {}

  ngOnInit(): void {
    this.currentTeacherName = null;
    this.initCurrentTeacherChangedSubscription();
    this.teacherService.currentTeacherChanged.next(currentTeacherChangedAction.Init);

    this.signalR.startConnection();
    this.signalR.addTransferChartDataListener();
    this.signalR.emitMeasurements.subscribe((data) => {
      console.log('?----------Header---------?' + JSON.stringify(data));
      if (data) {
        this.isLessonLive = true;
      } else {
        this.isLessonLive = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isLessonAlive(): boolean {
    return !this.signalR.isDataFinished();
  }

  initCurrentTeacherChangedSubscription(): void {
    this.sub = this.teacherService.currentTeacherChanged.subscribe(
      (isChanged: number) => {
        if (isChanged == currentTeacherChangedAction.Init) {
          this.currentTeacherName =
            this.teacherService.getCurrentTeacherFirstName();
        }
      }
    );
  }

  onLiveBtnClick() {
    if (this.isLessonLive) {
      this.router.navigate(['/live']);
    }
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
    this.currentTeacherName = null;
    // this.teacherService.currentTeacherChanged.next(true);
    this.router.navigate(['']);
  }
}
