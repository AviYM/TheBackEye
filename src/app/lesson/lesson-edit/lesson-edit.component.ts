import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { ILesson, LessonResolved } from '../lesson.interface';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit {
  pageTitle = 'Lesson Configuration';
  errorMessage: string;

  disableStudentLink: boolean = true;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalLessson) !== JSON.stringify(this.currentLesson);
  }

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

  constructor(private lessonService: LessonService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: LessonResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onLessonRetrieved(resolvedData.lesson);
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
        this.pageTitle = `Edit Lesson: ${this.lesson.title}`;
      }
    }
  }

  deleteLesson(): void {
    if (this.lesson.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.lesson.title} was deleted`);
    } else {
      if (confirm(`Really delete the lesson: ${this.lesson.title}?`)) {
        this.lessonService.removeLesson(this.lesson.id).subscribe({
          next: () => this.onSaveComplete(`${this.lesson.title} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
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
          next: () => this.onSaveComplete(`The new ${this.lesson.title} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.lessonService.editLesson(this.lesson).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.lesson.title} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back
    this.location.back();
    //this.router.navigate(['/lesson', this.lesson.id, 'edit','students']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.lesson.title &&
      this.lesson.title.length >= 3) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    // if (this.product.category &&
    //   this.product.category.length >= 3) {
    //   this.dataIsValid['tags'] = true;
    // } else {
    //   this.dataIsValid['tags'] = false;
    // }
  }

  // getLesson(id: number): void {
  //   this.lessonService.getSingleLesson(id)
  //     .subscribe({
  //       next: (lesson: ILesson) => this.displayLesson(lesson),
  //       error: err => this.errorMessage = err
  //     });
  // }

  // displayLesson(lesson: ILesson): void {
  //   if (this.lessonForm) {
  //     this.lessonForm.reset();
  //   }
  //   this.lesson = lesson;

  //   if (this.lesson.id === 0) {
  //     this.pageTitle = 'Add Lesson';
  //   } else {
  //     this.pageTitle = `Edit Lesson: ${this.lesson.title}`;
  //   }

  //   // Update the data on the form
  //   this.lessonForm.patchValue({
  //     dayOfWeek: this.lesson.dayOfWeek,
  //     link: this.lesson.platform,
  //     starRating: this.lesson.link,
  //     description: this.lesson.description,
  //     startTime: this.lesson.startTime,
  //     endTime: this.lesson.endTime,
  //     isActive: this.lesson.isActive,
  //     breakStart: this.lesson.breakStart,
  //     breakEnd: this.lesson.breakEnd,
  //     maxLate: this.lesson.maxLate,
  //   });
  //   //this.lessonForm.setControl('students', this.fb.array(this.students || []));
  // }

  goBack() {
    this.location.back();
  }

}
