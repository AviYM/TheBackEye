import { Component, OnInit } from '@angular/core';
import { ILesson } from '../lesson.interface';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  public lessons: ILesson[] = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "bla bla",
      platform: "Zoom",
      link: "https://us02web.zoom.us/j/89772322297",
      isActive: true,
      dayOfWeek: "Monday",
      startTime: "10:30",
      endTime: "12:30",
      breakStart: "11:30",
      breakEnd: "11:40",
      maxLate: "10"
    },
    {
      id: 2,
      title: "Introduction to Object Oriented Programming",
      description: "bla bla",
      platform: "Zoom",
      link: "https://us02web.zoom.us/j/89772322297",
      isActive: true,
      dayOfWeek: "Sunday",
      startTime: "14:00",
      endTime: "17:00",
      breakStart: "15:30",
      breakEnd: "15:40",
      maxLate: "15"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
