import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from 'src/app/student/student.interface';
import { ILesson } from '../lesson.interface';

@Component({
  selector: 'app-lesson-edit-students',
  templateUrl: './lesson-edit-students.component.html',
  styleUrls: ['./lesson-edit-students.component.scss'],
})
export class LessonEditStudentsComponent implements OnInit {
  errorMessage: string;
  student: IStudent;
  lesson: ILesson;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data) => {
      this.lesson = data['resolvedData'].lesson;
    });
  }

  addStudent() {}

  // // Add the defined tags
  // addTags(): void {
  //   if (!this.newTags) {
  //     this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
  //   } else {
  //     const tagArray = this.newTags.split(',');
  //     this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
  //     this.newTags = '';
  //     this.errorMessage = '';
  //   }
  // }

  // // Remove the tag from the array of tags.
  // removeTag(idx: number): void {
  //   this.product.tags.splice(idx, 1);
  // }
}
