import { ILesson } from "../lesson/lesson.interface";
import { IPerson } from "../shared/person.interface";

// export interface IStudent {
//   id: number;
//   fName: string;
//   lName: string;
//   birthId: string;
//   password: string;
// }

export interface StudentLesson {
  id: number;
  lesson: ILesson;
  lessonId: number;
  person: IPerson;
  personId: number;
}
