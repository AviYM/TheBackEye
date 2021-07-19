import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main/main.module';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { ChartMeasurementComponent } from './dashboard/chart-measurement/chart-measurement.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LessonModule } from './lesson/lesson.module';
import { SharedModule } from './shared/shared.module';
import { LessonEditComponent } from './lesson/lesson-edit/lesson-edit.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LessonMockData } from './lesson/lesson-mock-data';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LessonConfigComponent } from './lesson/lesson-config/lesson-config.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeComponent,
    ChartMeasurementComponent,
    LessonEditComponent,
    LessonConfigComponent
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
    InMemoryWebApiModule.forRoot(LessonMockData, { delay: 1000 }),
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
