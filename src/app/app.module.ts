import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainModule } from './main/main/main.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { EditLessonComponent } from './lesson/edit-lesson/edit-lesson.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent,
        children: [
          { path: '', component: EditLessonComponent },
          { path: 'lesson/:id', component: EditLessonComponent },
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
