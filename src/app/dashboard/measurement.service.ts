import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../shared/services/http/http.service';
import { LogService } from '../shared/services/log/log.service';
import { StudentAttendance } from '../student/student.interface';
import { TeacherAuthService } from '../teacher/teacher-auth.service';
import { IMeasurement } from './measurement.interface';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  baseUrl: string = 'Measurement';
  token: string;
  attendanceListChanged: Subject<boolean>;

  constructor(private teacherService: TeacherAuthService, private http: HttpService, private logger: LogService) { 
    this.attendanceListChanged = new Subject<boolean>();
    this.token = this.teacherService.getCurrentTeacherToken();
  }

  public getStudentsAttendance(lessonId: number, lessonTime: Date | string): Promise<StudentAttendance[]> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The MeasurementService.getStudentsAttendance() is called');

    const url = this.baseUrl + '/GetStudentsAttendance/' + lessonId + '/' + lessonTime;
    return this.http.read<StudentAttendance[]>(url, headers).toPromise();
  }

  public getLessonMeasurements(lessonId: number, lessonTime: Date | string): Promise<IMeasurement[]> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The MeasurementService.getLessonMeasurements() is called');

    const url = this.baseUrl + '/GetLessonMeasurements/' + lessonId + '/' + lessonTime;
    return this.http.read<IMeasurement[]>(url, headers).toPromise();
  }

  public getStudentMeasurements(lessonId: number, personId: number, lessonTime: Date | string): Promise<IMeasurement[]> {
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    this.logger.debug('The MeasurementService.getStudentMeasurements() is called');

    const url = this.baseUrl + '/GetStudentMeasurements/' + lessonId + '/' + personId + '/' + lessonTime;
    return this.http.read<IMeasurement[]>(url, headers).toPromise();
  }
}
