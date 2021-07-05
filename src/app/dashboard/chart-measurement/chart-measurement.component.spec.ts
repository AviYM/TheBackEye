import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMeasurementComponent } from './chart-measurement.component';

describe('ChartMeasurementComponent', () => {
  let component: ChartMeasurementComponent;
  let fixture: ComponentFixture<ChartMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
