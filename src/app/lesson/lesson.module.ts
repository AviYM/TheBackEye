import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AttendanceComponent } from './attendance/attendance.component';

@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class LessonModule {}
