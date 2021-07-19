import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from '../lesson.interface';

@Component({
  selector: 'app-lesson-edit-info',
  templateUrl: './lesson-edit-info.component.html',
  styleUrls: ['./lesson-edit-info.component.scss'],
})
export class LessonEditInfoComponent implements OnInit {
  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  @ViewChild(NgForm) lessonForm: NgForm;

  errorMessage: string;
  lesson: ILesson;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data) => {
      if (this.lessonForm) {
        this.lessonForm.reset();
      }

      this.lesson = data['resolvedData'].lesson;
    });
  }

  setIsActive(event) {
    if (event.checked) {
      this.lesson.isActive = !this.lesson.isActive;
    }
  }
}
