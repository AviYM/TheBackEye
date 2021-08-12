import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LessonConfigGuard } from './lesson/lesson-config.guard';
import { LessonConfigComponent } from './lesson/lesson-config/lesson-config.component';
import { LessonResolver } from './lesson/lesson-resolver.service';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentResolver } from './student/student-resolver.service';
import { AuthGuard } from './teacher/auth.guard';
import { AuthComponent } from './teacher/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
      { path: 'lesson/:id', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'lesson/:id/edit',
        component: LessonConfigComponent,
        canDeactivate: [LessonConfigGuard],
        canActivate: [AuthGuard],
        resolve: { resolvedData: LessonResolver },
      },
      {
        path: 'lesson/:id/students',
        component: StudentListComponent,
        canActivate: [AuthGuard],
        // resolve: { studentResolver: StudentResolver },
      },
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
