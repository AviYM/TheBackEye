import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LessonResolved } from './lesson.interface';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root',
})
export class LessonResolver implements Resolve<LessonResolved> {
  constructor(private lessonService: LessonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ lesson: null, error: message });
    }

    return this.lessonService.getSingleLesson(+id).pipe(
      map((lesson) => ({ lesson })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ lesson: null, error: message });
      })
    );
  }
}
