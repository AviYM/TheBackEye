import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainModule } from './main/main/main.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { ChartMeasurementComponent } from './dashboard/chart-measurement/chart-measurement.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LessonModule } from './lesson/lesson.module';
import { SharedModule } from './shared/shared.module';
import { LessonEditComponent } from './lesson/lesson-edit/lesson-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonResolver } from './lesson/lesson-resolver.service';
import { LessonEditInfoComponent } from './lesson/lesson-edit-info/lesson-edit-info.component';
import { LessonEditStudentsComponent } from './lesson/lesson-edit-students/lesson-edit-students.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeComponent,
    ChartMeasurementComponent,
    LessonEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    LessonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent,
        children: [
          { path: '', component: WelcomeComponent },
          { path: 'lesson/:id', component: DashboardComponent },
          {
            path: 'lesson/:id/edit',
            component: LessonEditComponent,
            //canDeactivate: [ProductEditGuard],
            resolve: { resolvedData: LessonResolver },
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' },
              { path: 'info', component: LessonEditInfoComponent },
              { path: 'students', component: LessonEditStudentsComponent }
            ]
          }
        ],
      },
      // { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
