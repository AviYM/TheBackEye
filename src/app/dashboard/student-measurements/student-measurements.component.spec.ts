import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMeasurementsComponent } from './student-measurements.component';

describe('StudentMeasurementsComponent', () => {
  let component: StudentMeasurementsComponent;
  let fixture: ComponentFixture<StudentMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
