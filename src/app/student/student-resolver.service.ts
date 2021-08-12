import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of } from 'rxjs';
import { IPerson } from '../shared/person.interface';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<IPerson[]> {

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot): Promise<IPerson[]> {
    const id = this.route.snapshot.paramMap.get('id'); 
    console.log('~~~~~~~~~~~~~~' + id);
    return this.studentService.getStudentList(+id);
  }
}
