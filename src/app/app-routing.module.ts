import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLessonComponent } from './lesson/edit-lesson/edit-lesson.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'register', component: MainComponent, children: [
    { path: 'edit', component: EditLessonComponent }
  ]},
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', redirectTo: 'register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
