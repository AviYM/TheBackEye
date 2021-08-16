import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { StudentAttendance } from '../student/student.interface';
import { IMeasurement } from './measurement.interface';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private baseUrl: string = 'Measurement';
  attendanceListChanged: Subject<boolean>;

  constructor(private http: HttpService, private logger: LogService) { 
    this.attendanceListChanged = new Subject<boolean>();
  }

  public getStudentsAttendance(lessonId: number, lessonDate: Date | string): Promise<StudentAttendance[]> {
    this.logger.debug('The MeasurementService.getStudentsAttendance() is called');

    const url = this.baseUrl + '/GetStudentsAttendance/' + lessonId + '/' + lessonDate;
    return this.http.read<StudentAttendance[]>(url).toPromise();
  }

  public getLessonMeasurements(lessonId: number, lessonDate: Date | string): Promise<IMeasurement[]> {
    this.logger.debug('The MeasurementService.getLessonMeasurements() is called');

    const url = this.baseUrl + '/GetLessonMeasurements/' + lessonId + '/' + lessonDate;
    return this.http.read<IMeasurement[]>(url).toPromise();
  }

  public getStudentMeasurements(lessonId: number, personId: number, lessonTime: Date | string): Promise<IMeasurement[]> {
    this.logger.debug('The MeasurementService.getStudentMeasurements() is called');

    const url = this.baseUrl + '/GetStudentMeasurements/' + lessonId + '/' + personId + '/' + lessonTime;
    return this.http.read<IMeasurement[]>(url).toPromise();
  }
}
