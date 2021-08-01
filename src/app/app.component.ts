import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from './shared/services/log/log.service';
import { AuthComponent } from './teacher/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'teacher-app';
  isClicked: boolean;

  constructor(private logger: LogService, private dialog: MatDialog) {
    this.isClicked = false;
  }

  ngOnInit() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {disableClose: true}
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.isClicked = false;
      this.logger.log('The dialog was closed');
      this.logger.log(result);
    });

  }

}

