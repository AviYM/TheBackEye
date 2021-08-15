import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-measurement',
  templateUrl: './chart-measurement.component.html',
  styleUrls: ['./chart-measurement.component.scss'],
})
export class ChartMeasurementComponent implements OnInit {
  name = 'Angular';
  // view: any[];
  width: number = 1000;
  height: number = 300;
  fitContainer: boolean = false;

  view:[number, number] = [this.width, this.height];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
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

  //pie
  showLabels = true;
  // data goes here
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
  // public multi = [
  //   {
  //     name: 'China',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 2243772,
  //       },
  //       {
  //         name: '2017',
  //         value: 1227770,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'USA',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 1126000,
  //       },
  //       {
  //         name: '2017',
  //         value: 764666,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Norway',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 296215,
  //       },
  //       {
  //         name: '2017',
  //         value: 209122,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Japan',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 257363,
  //       },
  //       {
  //         name: '2017',
  //         value: 205350,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Germany',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 196750,
  //       },
  //       {
  //         name: '2017',
  //         value: 129246,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'France',
  //     series: [
  //       {
  //         name: '2018',
  //         value: 204617,
  //       },
  //       {
  //         name: '2017',
  //         value: 149797,
  //       },
  //     ],
  //   },
  // ];

  constructor() {
    //Object.assign(this, this.single);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {}
}
