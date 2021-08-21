import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/lesson/lesson.service';
import { GroupByService } from 'src/app/shared/services/GroupByService';
import {
  IMeasurement,
  NameSeries,
  NameValueMap,
} from '../measurement.interface';
import { SignalRService } from '../signal-r.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit {
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
    domain: ['#994800','#b12c2c','#ff5a50','#fc9f9d','#97b6f4','#4949f9','#100b7b',],
  };
  lineChartColorScheme = { domain: ['#4949f9'] };

  constructor(
    private signalRService: SignalRService,
    private location: Location,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.signalRService.emitMeasurements.subscribe((data: IMeasurement[]) => {
      console.log('?---------Live----------?' + JSON.stringify(data));
      if (data) {
        let measurements: IMeasurement[] = [];
        data.forEach((m) => {
          if (this.lessonService.isLessonOfTeacher(m.lessonId)) {
            measurements.push(m);
          }
        });
        this.processMeasurments(measurements);
      }
    });
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

  private generateLineChart(measurements: IMeasurement[]) {
    interface TimeToPositiveAndAllMeasurments {
      time: string;
      positiveMeasurementsCount: number;
      allMeasurementsCount: number;
    }
    let timesData: TimeToPositiveAndAllMeasurments[] = [];

    let metricNames = this.getBooleanMetricNames();

    let gbTime = GroupByService.groupBy(measurements, (m: IMeasurement) =>
      this.getTimeFromDate(m.dateTime.toString())
    );

    gbTime.forEach((val, key) => {
      let tData: TimeToPositiveAndAllMeasurments = {
        "time": key,
        "positiveMeasurementsCount": 0,
        "allMeasurementsCount": 0,
      };

      val.forEach((m) => {
        metricNames.forEach((t) => {
          let accurateMetric = this.isAccurateMetric(t);
          accurateMetric? tData.allMeasurementsCount += 2: tData.allMeasurementsCount++;
          if (m[t] === true) {
            accurateMetric? tData.positiveMeasurementsCount += 2: tData.positiveMeasurementsCount++;
          }
        });
      });

      timesData.push(tData);
    });

    let dataToLineChart: NameValueMap[] = [];
    timesData.forEach((e) => {
      dataToLineChart.push({
        "name": e.time,
        "value": 100 * (e.positiveMeasurementsCount / e.allMeasurementsCount),
      });
    });

    console.log('?--------------------?' + JSON.stringify(dataToLineChart));

    if (this.lineChartData.length) {
      dataToLineChart.forEach((element) => {
        this.lineChartData[0].series.push(element);
        this.lineChartData = [...this.lineChartData];
      });
    } else {
      this.lineChartData.push({
        "name": 'Average class concentration',
        "series": dataToLineChart,
      });
    }
  }

  private generatePieGrid(measurements: IMeasurement[]) {
    let metricNames = this.getBooleanMetricNames();

    let gbPersonId = GroupByService.groupBy(measurements, (m: IMeasurement) =>
      m.personId.toString()
    );

    // map between personId - specific student and his data processed data.
    let map: Map<string, NameValueMap[]> = new Map();
    gbPersonId.forEach((val, key) => {
      let c: NameValueMap[] = [];
      metricNames.forEach((t) => c.push({ name: t, value: 0 }));

      val.forEach((m) => {
        metricNames.forEach((t) => {
          if (m[t] === true) {
            c.find((element) => element.name === t).value += 1;
          }
        });
      });
      c.forEach((e) => (e.value /= val.length));

      map.set(key, c);
    });

    let finalResults: NameValueMap[] = [];
    metricNames.forEach((t) => finalResults.push({ name: t, value: 0 }));

    // calc the average of each measure based on all students.
    let keysNum = 0;
    map.forEach((val, key) => {
      metricNames.forEach((t) => {
        finalResults.find((e) => e.name === t).value += val.find((e) => e.name === t).value;
      });
      keysNum++;
    });

    finalResults.forEach((fr) => (fr.value = (fr.value / keysNum) * 100));

    this.pieGridData = [];
    finalResults.forEach((fr) => {
      fr.name = this.rewriteMetricNameToDisplay(fr.name);
      this.pieGridData.push({ name: fr.name, value: fr.value });
    });
  }

  private processMeasurments(measurements: IMeasurement[]) {
    this.generateLineChart(measurements);
    this.generatePieGrid(measurements);
  }
}
