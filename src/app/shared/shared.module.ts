import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LessonListComponent } from '../lesson/lesson-list/lesson-list.component';

const componentList = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  LessonListComponent,
];

@NgModule({
  declarations: [...componentList],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [...componentList],
})
export class SharedModule {}
