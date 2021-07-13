import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [EditLessonComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ],
})
export class LessonModule {}
