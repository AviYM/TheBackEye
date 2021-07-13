import { TestBed } from '@angular/core/testing';

import { LessonResolverService } from './lesson-resolver.service';

describe('LessonResolverService', () => {
  let service: LessonResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
