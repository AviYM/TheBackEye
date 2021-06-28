import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { EditLessonComponent } from 'src/app/lesson/edit-lesson/edit-lesson.component';


@NgModule({
  declarations: [
    MainComponent,
    EditLessonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class MainModule { }
