import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILesson } from '../lesson.interface';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss'],
})
export class EditLessonComponent implements OnInit {
  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  @ViewChild('f') form: NgForm;

  selectFormControl = new FormControl('', Validators.required);
  selectedIndex: number = 0;

  constructor(
    private dialogRef: MatDialogRef<EditLessonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILesson,
    public lessonService: LessonService
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  nextStep(): void {
    const formValues = this.form.form.value;

    if (this.form.valid) {
      const newLesson: ILesson = {
        id: 21,
        title: formValues.title,
        dayOfWeek: formValues.day,
        description: '',
        platform: 'Zoom',
        link: 'https://zoom.com',
        startTime: formValues.hour + ':' + formValues.minute,
        endTime: '',
        startBreak: '',
        endBreak: '',
        maxLate: '',
        isActive: true,
      };

      this.lessonService.addLesson(newLesson);

      console.log('The lesson changes are saved');
      console.log(this.form);
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  public saveLesson(): void {
    console.log('The lesson changes are saved');
    this.dialogRef.close();
  }
}
