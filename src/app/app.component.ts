import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonComponent } from './lesson/edit-lesson/edit-lesson.component';
import { LogService } from './shared/log/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'teacher-app';
  isClicked: boolean;
  showModal: boolean;

  constructor(private logger: LogService, private dialog: MatDialog) {
    this.isClicked = false;
    this.showModal = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditLessonComponent, {}
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.isClicked = false;
      this.logger.log('The dialog was closed');
      this.logger.log(result);
    });

  }

}

