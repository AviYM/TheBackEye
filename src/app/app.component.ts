import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LogService } from './shared/services/log/log.service';
import { AuthComponent } from './teacher/auth/auth.component';
import { TeacherAuthService } from './teacher/teacher-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'teacher-app';
  sub!: Subscription;

  constructor(
    private logger: LogService,
    private dialog: MatDialog,
    private teacherService: TeacherAuthService
  ) {}

  ngOnInit() {
    this.openDialog();
    this.initCurrentTeacherChangedSubscription();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initCurrentTeacherChangedSubscription(): void {
    this.sub = this.teacherService.currentTeacherChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          if (!this.teacherService.getCurrentTeacherFirstName()) {
            this.openDialog();
          }
        }
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      AuthComponent,
      { disableClose: true } //, width: "100%", height: "100%"
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.log('The dialog was closed');
      this.logger.log(result);
    });
  }
}
