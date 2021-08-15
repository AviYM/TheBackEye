import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from 'src/app/shared/services/log/log.service';
import { LessonService } from '../../lesson/lesson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lessonId: number;
  lessonHistory: Date[];
  currentLesson: Date | string;

  constructor(private route: ActivatedRoute, private router: Router, private lessonService: LessonService, private logger: LogService) { }

  async ngOnInit(): Promise<void> {
    this.lessonId = +this.route.snapshot.paramMap.get('id'); 
    this.lessonHistory = await this.lessonService.getLessonHistory(this.lessonId);
    this.logger.info(this.lessonHistory);
    // this.currentLesson = this.lessonHistory[0];
  }

  viewAttendanceReport() {
    this.router.navigate(['/lesson', this.lessonId, 'attendance', this.currentLesson]);
  }
}
