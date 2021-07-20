import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LessonEditInfoComponent } from './lesson-edit-info/lesson-edit-info.component';
import { LessonEditStudentsComponent } from './lesson-edit-students/lesson-edit-students.component';

@NgModule({
  declarations: [EditLessonComponent, LessonEditInfoComponent, LessonEditStudentsComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class LessonModule {}
