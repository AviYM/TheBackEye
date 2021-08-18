import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupByService } from '../../shared/services/GroupByService';
import { LogService } from '../../shared/services/log/log.service';
import { IMeasurement, NameSeries, NameValueMap } from '../measurement.interface';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-chart-measurement',
  templateUrl: './chart-measurement.component.html',
  styleUrls: ['./chart-measurement.component.scss'],
})
export class ChartMeasurementComponent implements OnInit {
  showCharts: boolean = true;
  measurements: IMeasurement[];
  pieGridData: NameValueMap[] = [];
  lineChartData: NameSeries[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  private _lessonId: number;
  @Input() set lessonId(id: number){
    if (id) {
      this._lessonId = id;
      this.logger.log('The updated lesson ID is: ' + this._lessonId);
    }
  }

  private _lessonDate: string;
  @Input() set lessonDate(date: string) {
    if(date) {
      this.showCharts = true;
      this._lessonDate = date.replace(' ', 'T');
      this.logger.log('The updated lesson date is: ' + this._lessonDate);
      this.pieGridData = [];
      this.lineChartData = [];
      this.fetchMeasurements();
    } else {
      this.showCharts = false;
      this.pieGridData = null;
      this.lineChartData = null;
    }
  }

  // Chart definitions
  viewLineChart:[number, number] = [980, 300];
  viewPieGrid:[number, number] = [980, 200];
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
    private logger: LogService,
  ) {}

  onSelect(event) {
    this.logger.log(event);
  }

  ngOnInit() {
    this.fetchMeasurements();
  }

  private async fetchMeasurements() {
    if (this._lessonId && this._lessonDate) {
      this.measurements = await this.measurementService.getLessonMeasurements(this._lessonId, this._lessonDate);
      if (!this.measurements) {
        this.showCharts = false;
      }
      this.processMeasurments();
    }
  }

  private getTimeFromDate(date: string) {
    return date.split('T')[1].substring(0, 7);
  }

  private generateLineChart() {
    interface TimeToPositiveAndAllMeasurments {
      time: string;
      positiveMeasurementsCount: number;
      allMeasurementsCount: number;
    };
    let timesData: TimeToPositiveAndAllMeasurments[] = [];

    // all boolean measurements.
    let measurementTitles = [
     'headPose', 'faceRecognition', 'sleepDetector', 'onTop', 'faceDetector', 'objectDetection', 'soundCheck'
    ];

    let gbTime = GroupByService.groupBy(this.measurements, (m: IMeasurement) => this.getTimeFromDate(m.dateTime.toString()));
    // gbTime.forEach((val, key) => {
    //   this.logger.log('^^^^^^^^ In the time: ' + key + ', there are: ' + val.length + ' measuremrnts.')
    // });

    gbTime.forEach((val, key) => {
      let tData: TimeToPositiveAndAllMeasurments = {
        "time": key,
        "positiveMeasurementsCount": 0,
        "allMeasurementsCount": 0
      }

      val.forEach((m) => {
        measurementTitles.forEach((t) => {
          tData.allMeasurementsCount++;
          if (m[t] === true) {
            tData.positiveMeasurementsCount++;
          }
        });
      });

      timesData.push(tData);
      this.logger.log(tData.time + '===' + tData.positiveMeasurementsCount + '===' + tData.allMeasurementsCount);
    });

    let dataToLineChart: NameValueMap[] = [];
    timesData.forEach((e) => {
      dataToLineChart.push({"name": e.time, "value": 100 * (e.positiveMeasurementsCount / e.allMeasurementsCount)});
    });

    this.lineChartData.push({"name": "Average class concentration", "series": dataToLineChart});
  }

  private generatePieGrid() {
    // all boolean measurements.
    let measurementTitles = [
      'headPose', 'faceRecognition', 'sleepDetector', 'onTop', 'faceDetector', 'objectDetection', 'soundCheck'
    ];

    // Count how many 'true' there are for each measurement in the list of measurements.
    // let measurementFrequencyCounters: NameValueMap[] = [];// MeasurementFrequencyCounter
    // measurementTitles.forEach((t) => measurementFrequencyCounters.push({"name": t, "value": 0}));
    // this.measurements.forEach((m) => {
    //   measurementTitles.forEach((t) => {
    //     if (m[t] === true) {
    //       measurementFrequencyCounters.find((element) => element.name === t).value += 1;
    //     }
    //   });
    // });
    // this.logger.log(measurementFrequencyCounters);
 
    let gbPersonId = GroupByService.groupBy(this.measurements, (m: IMeasurement) => m.personId.toString());

    // map between personId - specific student and his data processed data.
    let map: Map<string, NameValueMap[]> = new Map();
    gbPersonId.forEach((val, key) => {
      // this.logger.log('The Key: ' + key);
      // this.logger.log(JSON.stringify(val));

      let c: NameValueMap[] = [];
      measurementTitles.forEach((t) => c.push({"name": t, "value": 0}));

      val.forEach((m) => {
        measurementTitles.forEach((t) => {
          if (m[t] === true) {
            c.find((element) => element.name === t).value += 1;
          }
        });
      });

      c.forEach((e) => e.value /= val.length);
      map.set(key, c);
    });

    // map.forEach((val, key) => {
    //   this.logger.log('The Key: ' + key);
    //   this.logger.log(JSON.stringify(val));
    // });

    let finalResults: NameValueMap[] = [];
    measurementTitles.forEach((t) => finalResults.push({"name": t, "value": 0}));

    // calc the average of each measure based on all students.
    let keysNum = 0;
    map.forEach((val, key) => {
      measurementTitles.forEach((t) => {
        finalResults.find((e) => e.name === t).value += val.find((e) => e.name === t).value;
      });
      keysNum++;
    });

    finalResults.forEach((fr) => fr.value = (fr.value / keysNum) * 100);
    finalResults.forEach((fr) => this.pieGridData.push({"name": `${fr.name[0].toUpperCase()}${fr.name.slice(1)}`.replace(/([A-Z])/g, ' $1').trim(), "value": fr.value}));

    this.logger.log(finalResults);
    this.logger.log(keysNum);
  }

  private processMeasurments() {
    this.generateLineChart()
    this.generatePieGrid();
  }
}
