import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<IStudent[]> {

  constructor(private studentService: StudentService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IStudent[]> {
    return this.studentService.getStudentList();
  }
}
