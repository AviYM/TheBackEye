import { IPerson } from "../shared/person.interface";

export interface ILesson {
  id: number;
  personId: number;
  name: string;
  description: string;
  platform: string;
  link: string;
  isActive: boolean;
  dayOfWeek: string;
  startTime: Date | string;
  endTime: Date | string;
  breakStart: Date | string;
  breakEnd: Date | string;
  maxLate: string;
  classCode: string;
}

export interface LessonResolved {
  lesson: ILesson;
  error?: any;
}

export interface SelectedLesson {
  lesson: ILesson;
  isSelected: boolean;
}
