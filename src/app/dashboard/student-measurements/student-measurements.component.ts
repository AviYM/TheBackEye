import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../../shared/services/log/log.service';
import { IMeasurement, NameValueMap } from '../measurement.interface';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-student-measurements',
  templateUrl: './student-measurements.component.html',
  styleUrls: ['./student-measurements.component.scss'],
})
export class StudentMeasurementsComponent implements OnInit {
  lessonId: number;
  lessonDate: string;
  studentId: number;
  studentMeasurements: IMeasurement[];
  pieGridData: NameValueMap[] = [];

  viewPieGrid:[number, number] = [980, 200];
  pieGridColorScheme = {
    domain: ['#994800', '#b12c2c', '#ff5a50', '#fc9f9d', '#97b6f4', '#4949f9', '#100b7b'],
  };

  constructor(
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private location: Location,
    private logger: LogService,
  ) {}

  ngOnInit() {
    this.lessonId = +this.route.snapshot.paramMap.get('id');
    this.lessonDate = this.route.snapshot.paramMap.get('date');
    this.studentId = +this.route.snapshot.paramMap.get('personId');

    this.fetchMeasurements();
  }

  private async fetchMeasurements() {
    if (this.lessonId && this.studentId && this.lessonDate) {
      this.studentMeasurements =
      await this.measurementService.getStudentMeasurements(
        this.lessonId,
        this.studentId,
        this.lessonDate
      );
      // this.logger.log(JSON.stringify(this.studentMeasurement));

      this.processMeasurments();
    }
  }

  onSelect(event) {
    // this.logger.log(event);
  }

  goBack() {
    this.location.back();
  }

  processMeasurments() {
    // all boolean measurements.
    let measurementTitles = [
      'headPose', 'faceRecognition', 'sleepDetector', 'onTop', 'faceDetector', 'objectDetection', 'soundCheck'
    ];

    measurementTitles.forEach((t) => this.pieGridData.push({"name": t, "value": 0}));

    this.studentMeasurements.forEach((m) => {
      measurementTitles.forEach((t) => {
        if (m[t] === true) {
          this.pieGridData.find((element) => element.name === t).value += 1;
        }
      });
    });

    this.pieGridData.forEach((e) => {
      e.name = `${e.name[0].toUpperCase()}${e.name.slice(1)}`.replace(/([A-Z])/g, ' $1').trim();
      e.value = 100 * (e.value / this.studentMeasurements.length);
    });
  }
}
