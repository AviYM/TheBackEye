import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupByService } from 'src/app/shared/services/GroupByService';
import { LogService } from '../../shared/services/log/log.service';
import { IMeasurement, NameSeries, NameValueMap } from '../measurement.interface';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-student-measurements',
  templateUrl: './student-measurements.component.html',
  styleUrls: ['./student-measurements.component.scss'],
})
export class StudentMeasurementsComponent implements OnInit {
  showCharts: boolean;
  lessonId: number;
  lessonDate: string;
  studentId: number;
  studentMeasurements: IMeasurement[];
  pieGridData: NameValueMap[] = [];
  lineChartData: NameSeries[] = [];

// Chart definitions
showXAxis = true;
showYAxis = true;
gradient = false;
showXAxisLabel = true;
// xAxisLabel: "''";
showYAxisLabel = true;
// yAxisLabel: "''";
pieGridColorScheme = {
  domain: ['#994800', '#b12c2c', '#ff5a50', '#fc9f9d', '#97b6f4', '#4949f9', '#100b7b'],
};
lineChartColorScheme = { domain: ['#4949f9'],}  

  constructor(
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private location: Location,
    private logger: LogService
  ) {}

  ngOnInit() {
    this.lessonId = +this.route.snapshot.paramMap.get('id');
    this.lessonDate = this.route.snapshot.paramMap.get('date');
    this.studentId = +this.route.snapshot.paramMap.get('personId');
    if (!this.lessonId || !this.studentId) {
      this.showCharts = false;
    } else {
      this.showCharts = true;
    }

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
      if (!this.studentMeasurements || !this.studentMeasurements.length) {
        this.showCharts = false;
      }
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

  private getTimeFromDate(date: string) {
    return date.split('T')[1].substring(0, 7);
  }

  private isAccurateMetric(metricName: string): boolean {
    if (metricName === 'onTop' || metricName === 'soundCheck') {
      return true;
    }
    return false;
  }

  private getBooleanMetricNames() {
    return [
      'headPose',
      'faceRecognition',
      'sleepDetector',
      'onTop',
      'faceDetector',
      'objectDetection',
      'soundCheck',
    ];
  }

  private rewriteMetricNameToDisplay(metricName: string): string {
    return `${metricName[0].toUpperCase()}${metricName.slice(1)}`
    .replace(/([A-Z])/g, ' $1')
    .trim();
  }

  private generateLineChart() {
    interface TimeToPositiveAndAllMeasurments {
      time: string;
      positiveMeasurementsCount: number;
      allMeasurementsCount: number;
    }
    let timesData: TimeToPositiveAndAllMeasurments[] = [];

    let metricNames = this.getBooleanMetricNames();

    let gbTime = GroupByService.groupBy(this.studentMeasurements, (m: IMeasurement) =>
      this.getTimeFromDate(m.dateTime.toString())
    );

    gbTime.forEach((val, key) => {
      let tData: TimeToPositiveAndAllMeasurments = {
        time: key,
        positiveMeasurementsCount: 0,
        allMeasurementsCount: 0,
      };

      val.forEach((m) => {
        metricNames.forEach((t) => {
          let accurateMetric = this.isAccurateMetric(t);
          accurateMetric? (tData.allMeasurementsCount += 2): tData.allMeasurementsCount++;
          if (m[t] === true) {
            accurateMetric? (tData.positiveMeasurementsCount += 2): tData.positiveMeasurementsCount++;
          }
        });
      });

      timesData.push(tData);
    });

    let dataToLineChart: NameValueMap[] = [];
    timesData.forEach((e) => {
      dataToLineChart.push({
        name: e.time,
        value: 100 * (e.positiveMeasurementsCount / e.allMeasurementsCount),
      });
    });

    this.lineChartData.push({
      name: 'Average class concentration',
      series: dataToLineChart,
    });
  }

  private generatePieGrid() {
    let metricNames = this.getBooleanMetricNames();

    metricNames.forEach((t) =>
      this.pieGridData.push({ name: t, value: 0 })
    );

    this.studentMeasurements.forEach((m) => {
      metricNames.forEach((t) => {
        if (m[t] === true) {
          this.pieGridData.find((element) => element.name === t).value += 1;
        }
      });
    });

    this.pieGridData.forEach((e) => {
      e.name = this.rewriteMetricNameToDisplay(e.name);
      e.value = 100 * (e.value / this.studentMeasurements.length);
    });
  }

  processMeasurments() {
    this.generateLineChart();
    this.generatePieGrid();
  }
}
