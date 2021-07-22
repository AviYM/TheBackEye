export interface ILesson {
  id: number;
  title: string;
  description: string;
  platform: string;
  link: string;
  isActive: boolean;
  dayOfWeek: string | number;
  startTime: string;
  endTime: string;
  startBreak: string;
  endBreak: string;
  maxLate: string;
}

export interface LessonResolved {
  lesson: ILesson;
  error?: any;
}

export interface SelectedLesson {
  lesson: ILesson;
  isSelected: boolean;
}
