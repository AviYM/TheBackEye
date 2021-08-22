import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CsvDataService } from '../../shared/services/CsvDataService';
import { MeasurementService } from '../../dashboard/measurement.service';
import { IPerson } from '../../shared/person.interface';
import { LogService } from '../../shared/services/log/log.service';
import { StudentAttendance } from '../../student/student.interface';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {
  lessonId: number;
  lessonDate: Date | string;
  studentsAttendance: StudentAttendance[];
  sub!: Subscription;

  constructor(
    private measurementService: MeasurementService, 
    private route: ActivatedRoute, 
    private router: Router,
    private location: Location,
    private logger: LogService
  ) { }

  async ngOnInit(): Promise<void> {
    this.lessonId = +this.route.snapshot.paramMap.get('id');
    this.lessonDate = this.route.snapshot.paramMap.get('date');

    this.initAttendanceListChangedSubscription();
    this.measurementService.attendanceListChanged.next(true);

    this.route.params.subscribe(async params => {
      this.lessonId = params['id'];
      this.logger.log("URL id has changed")
      // this.initAttendanceListChangedSubscription();
      this.measurementService.attendanceListChanged.next(true);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private initAttendanceListChangedSubscription() {
    this.sub = this.measurementService.attendanceListChanged.subscribe(
      async (isChanged: boolean) => {
        if (isChanged) {
          this.studentsAttendance = [];
          this.studentsAttendance = await this.measurementService.getStudentsAttendance(this.lessonId, this.lessonDate);
        }
      }
    );
  }

  studentMeasurements(student: IPerson) {
    this.router.navigate(['/lesson', this.lessonId, this.lessonDate, 'student', student.id]);
  }

  downloadAttendance() {
    interface Row {
      Full_Name: string;
      Birth_ID: string;
      Entrance_Time: Date | string;
    }

    let data: Row[] = [];

    this.studentsAttendance.forEach((sa) => {
      data.push({
        "Full_Name": sa.person.lastName + ' ' + sa.person.firstName,
        "Birth_ID": sa.person.birthId,
        "Entrance_Time": sa.entranceTime.toString()
      });
    });

    CsvDataService.exportToCsv(this.lessonDate + '.csv', data);
  }

  goBack() {
    this.location.back();
  }
}
