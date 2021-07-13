import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEditInfoComponent } from './lesson-edit-info.component';

describe('LessonEditInfoComponent', () => {
  let component: LessonEditInfoComponent;
  let fixture: ComponentFixture<LessonEditInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonEditInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
