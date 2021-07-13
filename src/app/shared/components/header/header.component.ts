import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditLessonComponent } from 'src/app/lesson/edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  isClicked: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isClicked = false;
  }

  toggleSideBar() {
    this.toggleSidebar.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  config: MatDialogConfig = {
    panelClass: "dialog-responsive",
    //height: '100%'
  }

  openEditLessonDialog(): void {
    const dialogRef = this.dialog.open(EditLessonComponent, this.config
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.isClicked = false;
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
