import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LessonConfigComponent } from './lesson/lesson-config/lesson-config.component';
import { LessonEditInfoComponent } from './lesson/lesson-edit-info/lesson-edit-info.component';
import { LessonEditStudentsComponent } from './lesson/lesson-edit-students/lesson-edit-students.component';
import { LessonEditComponent } from './lesson/lesson-edit/lesson-edit.component';
import { LessonResolver } from './lesson/lesson-resolver.service';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './main/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'lesson/:id', component: DashboardComponent },
      {
        path: 'lesson/:id/edit',
        component: LessonConfigComponent,
        //canDeactivate: [ProductEditGuard],
        resolve: { resolvedData: LessonResolver },
        // children: [
        //   { path: '', redirectTo: 'info', pathMatch: 'full' },
        //   { path: 'info', component: LessonEditInfoComponent },
        //   { path: 'students', component: LessonEditStudentsComponent }
        // ]
      }
    ],
  },
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
