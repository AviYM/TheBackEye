import { TestBed } from '@angular/core/testing';

import { LessonConfigGuard } from './lesson-config.guard';

describe('LessonConfigGuard', () => {
  let guard: LessonConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LessonConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
