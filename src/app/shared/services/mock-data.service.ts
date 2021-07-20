import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ILesson } from '../../lesson/lesson.interface';
import { IStudent } from '../../student/student.interface';

export class MockDataService implements InMemoryDbService {
  createDb(): { lessons: ILesson[], students: IStudent[] } {
    const lessons: ILesson[] = [
      {
        id: 1,
        title: 'Introduction to Computer Science',
        description: 'bla bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322292',
        isActive: true,
        dayOfWeek: 'Monday',
        startTime: '10:30',
        endTime: '12:30',
        startBreak: '11:30',
        endBreak: '11:40',
        maxLate: '10',
      },
      {
        id: 2,
        title: 'Introduction to Object Oriented Programming',
        description: 'bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322297',
        isActive: false,
        dayOfWeek: 'Sunday',
        startTime: '14:00',
        endTime: '17:00',
        startBreak: '15:30',
        endBreak: '15:40',
        maxLate: '15',
      },
      {
        id: 3,
        title: 'Artificial Intelligence',
        description: 'bla bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322293',
        isActive: true,
        dayOfWeek: 'Monday',
        startTime: '09:30',
        endTime: '12:00',
        startBreak: '10:15',
        endBreak: '10:30',
        maxLate: '5',
      },
      {
        id: 4,
        title: 'Operating System',
        description: 'bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322294',
        isActive: false,
        dayOfWeek: 'Sunday',
        startTime: '13:00',
        endTime: '14:00',
        startBreak: null,
        endBreak: null,
        maxLate: '5',
      },
      {
        id: 5,
        title: 'Machine Learning',
        description: 'bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322296',
        isActive: true,
        dayOfWeek: 'Sunday',
        startTime: '14:00',
        endTime: '16:00',
        startBreak: '15:00',
        endBreak: '15:10',
        maxLate: '8',
      },
    ];

    const students: IStudent[] = [
      {
        id: 1,
        fName: 'Jon',
        lName: 'Mile',
        birthId: '321321321'
      },
      {
        id: 2,
        fName: 'Roni',
        lName: 'Mile',
        birthId: '432432321'
      },
      {
        id: 3,
        fName: 'david',
        lName: 'Ram',
        birthId: '257257257'
      },
    ];

    return { lessons, students };
  }
}
