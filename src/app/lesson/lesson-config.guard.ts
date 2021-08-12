import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LessonConfigComponent } from './lesson-config/lesson-config.component';

@Injectable({
  providedIn: 'root',
})
export class LessonConfigGuard implements CanDeactivate<LessonConfigComponent> {
  canDeactivate(
    component: LessonConfigComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (component.isDirty) {
      const lessonName = component.lesson.name || 'New Lesson';
      return confirm(`Navigate away and lose all changes to ${lessonName}?`);
    }
    return true;
  }
}
