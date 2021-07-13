import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEditStudentsComponent } from './lesson-edit-students.component';

describe('LessonEditStudentsComponent', () => {
  let component: LessonEditStudentsComponent;
  let fixture: ComponentFixture<LessonEditStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonEditStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonEditStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
