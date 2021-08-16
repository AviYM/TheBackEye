import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogService } from '../../shared/services/log/log.service';
import { IMeasurement } from '../measurement.interface';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-chart-measurement',
  templateUrl: './chart-measurement.component.html',
  styleUrls: ['./chart-measurement.component.scss'],
})
export class ChartMeasurementComponent implements OnInit {
  measurements: IMeasurement[];
  sub!: Subscription;
  errorMessage: string = '';

  private _lessonId: number;
  @Input() set lessonId(id: number){
    if (id) {
      this._lessonId = id;
    }
  }

  private _lessonDate: string;
  @Input() set lessonDate(date: string) {
    if(date) {
      this._lessonDate = date.replace(' ', 'T');
      this.logger.log('The updated lesson date is: ' + this._lessonDate);
      this.fetchMeasurements();
    }
  }


  width: number = 900;
  height: number = 300;
  fitContainer: boolean = false;

  view:[number, number] = [this.width, this.height];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showLabels = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };

  public single = [
    {
      name: 'China',
      value: 2243772,
    },
    {
      name: 'USA',
      value: 1126000,
    },
    {
      name: 'Norway',
      value: 296215,
    },
    {
      name: 'Japan',
      value: 257363,
    },
    {
      name: 'Germany',
      value: 196750,
    },
    {
      name: 'France',
      value: 204617,
    },
  ];

  constructor(
    private measurementService: MeasurementService,
    private logger: LogService,
    private route: ActivatedRoute
  ) {}

  onSelect(event) {
    this.logger.log(event);
  }

  ngOnInit() {
    this.fetchMeasurements();
    
    // this.route.params.subscribe(async params => {
    //   this.lessonId = params['id'];
    // });
  }

  private async fetchMeasurements() {
    if (this._lessonId && this._lessonDate) {
      this.measurements = await this.measurementService.getLessonMeasurements(this._lessonId, this._lessonDate);
      this.processMeasurments()
    }
  }

  processMeasurments() {
    interface MeasurementFrequencyCounter {
      name: string;
      counter: number;
    }
    let counters: MeasurementFrequencyCounter[] = [];
    let measurementTitles = [
      'headPose', 'faceRecognition', 'sleepDetector', 'onTop', 'faceDetector', 'objectDetection', 'soundCheck'
    ];

    measurementTitles.forEach((t) => counters.push({"name": t, "counter": 0}));

    this.measurements.forEach((m) => {
      measurementTitles.forEach((t) => {
        if (m[t] === true) {
          counters.find((element) => element.name === t).counter += 1;
        }
      });
    });

    this.logger.log(counters);
  }
}
