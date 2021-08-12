import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { ILesson, LessonResolved } from '../lesson.interface';
import { LessonListChangedAction, LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-config',
  templateUrl: './lesson-config.component.html',
  styleUrls: ['./lesson-config.component.scss'],
})
export class LessonConfigComponent implements OnInit {
  pageTitle = 'Lesson Configuration';

  private currentLesson: ILesson;
  private originalLessson: ILesson;

  get lesson(): ILesson {
    return this.currentLesson;
  }
  set lesson(value: ILesson) {
    this.currentLesson = value;
    // Clone the object to retain a copy
    this.originalLessson = value ? { ...value } : null;
  }

  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  errorMessage: string;

  get isDirty(): boolean {
    return (
      JSON.stringify(this.originalLessson) !==
      JSON.stringify(this.currentLesson)
    );
  }

  private dataIsValid: { [key: string]: boolean } = {};

  constructor(
    private lessonService: LessonService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData: LessonResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onLessonRetrieved(resolvedData.lesson);

      // this.lesson = data['resolvedData'].lesson;
    });
  }

  onLessonRetrieved(lesson: ILesson): void {
    this.lesson = lesson;

    if (!this.lesson) {
      this.pageTitle = 'No lesson found';
    } else {
      if (this.lesson.id === 0) {
        this.pageTitle = 'Add Lesson';
      } else {
        this.pageTitle = `Edit Lesson: ${this.lesson.name}`;
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }
 
  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    if (
      this.lesson.name &&
      this.lesson.name.length >= 3 &&
      this.lesson.platform &&
      this.lesson.link &&
      this.lesson.dayOfWeek &&
      this.lesson.startTime &&
      this.lesson.endTime &&
      this.lesson.maxLate
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentLesson = null;
    this.originalLessson = null;
  }

  saveLesson(): void {
    if (this.isValid()) {
      if (this.lesson.id === 0) {
        this.lessonService.addLesson(this.lesson).subscribe({
          next: (retNewLesson) => this.onSaveComplete(retNewLesson, true, `The new ${retNewLesson.name} was saved`),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.lessonService.editLesson(this.lesson).subscribe({
          next: (retNewLesson) => this.onSaveComplete(retNewLesson, false, `The new ${retNewLesson.name} was saved`),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  private onSaveComplete(l: ILesson, continueToAddStudent: boolean, message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    this.lessonService.lessonListChanged.next(LessonListChangedAction.Reload);
    if(continueToAddStudent) {
      this.router.navigate(['/lesson', l.id, 'students']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  deleteLesson(): void {
    if (this.lesson.id === 0) {
      // Don't delete, it was never saved.
      this.onDeleteComplete(`${this.lesson.name} was deleted`);
    } else {
      if (confirm(`Really delete the lesson: ${this.lesson.name}?`)) {
        this.lessonService.removeLesson(this.lesson.id).subscribe({
          next: () => {
            this.onDeleteComplete(`${this.lesson.name} was deleted`);
            this.lessonService.lessonListChanged.next(LessonListChangedAction.Reload);
          },
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  onDeleteComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back
    this.router.navigate(['/welcome']);
    // this.location.back();
  }

  setIsActive(event) {
    if (event.checked) {
      this.lesson.isActive = !this.lesson.isActive;
    }
  }

  goBack() {
    //this.location.back();
    this.lessonService.lessonListChanged.next(LessonListChangedAction.Refresh);
    this.router.navigate(['/welcome']);
  }
}
