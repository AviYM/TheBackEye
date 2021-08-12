import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainModule } from './main/main/main.module';
import { LessonModule } from './lesson/lesson.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';

import { WelcomeComponent } from './main/welcome/welcome.component';
import { ChartMeasurementComponent } from './dashboard/chart-measurement/chart-measurement.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LessonConfigComponent } from './lesson/lesson-config/lesson-config.component';
import { StudentListComponent } from './student/student-list/student-list.component';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MockDataService } from './shared/services/mock-data.service';
import { AuthComponent } from './teacher/auth/auth.component';
import { SignInComponent } from './teacher/sign-in/sign-in.component';
import { SignUpComponent } from './teacher/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeComponent,
    ChartMeasurementComponent,
    LessonConfigComponent,
    StudentListComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MainModule,
    LessonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // InMemoryWebApiModule.forRoot(MockDataService, { delay: 1000 }),
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
