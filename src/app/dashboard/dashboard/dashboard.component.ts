import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../shared/services/log/log.service';
import { LessonService } from '../../lesson/lesson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lessonId: number;
  lessonHistory: string[]; // * string[] *
  currentLesson: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private lessonService: LessonService, 
    private logger: LogService, 
    private datepipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    this.lessonId = +this.route.snapshot.paramMap.get('id');
    this.getLessonDates();

    this.route.params.subscribe(async params => {
      this.lessonId = params['id'];
      this.getLessonDates();
      this.logger.log("URL id has changed")
    });
  }

  private async getLessonDates() {
    // this.lessonHistory = await this.lessonService.getLessonHistory(this.lessonId);
    let dates = await this.lessonService.getLessonHistory(this.lessonId);
    this.lessonHistory = []
    dates.forEach((d) => {
      // this.lessonHistory.push(this.datepipe.transform(d, 'd/M/yy - h:mm a'));
      this.lessonHistory.push(d.toString().replace('T', ' '));
    }); 
    this.logger.info(this.lessonHistory);
    this.currentLesson = this.lessonHistory[0];
  }

  viewAttendanceReport() {
    this.router.navigate(['/lesson', this.lessonId, 'attendance', this.currentLesson.replace(' ', 'T')]);
  }
}
