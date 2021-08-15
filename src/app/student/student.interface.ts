import { ILesson } from "../lesson/lesson.interface";
import { IPerson } from "../shared/person.interface";

export interface StudentLesson {
  id: number;
  lessonId: number;
  personId: number;
}

export interface StudentAttendance {
  person: IPerson;
  entranceTime: Date | string;
}
