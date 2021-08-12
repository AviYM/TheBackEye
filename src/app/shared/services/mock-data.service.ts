import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ILesson } from '../../lesson/lesson.interface';

export class MockDataService implements InMemoryDbService {
  createDb(): { lessons: ILesson[] } { // , students: IStudent[]
    const lessons: ILesson[] = [
      {
        id: 1,
        personId: 1,
        name: 'Introduction to Computer Science',
        description: 'bla bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322292',
        isActive: true,
        dayOfWeek: 'Monday',
        startTime: new Date(),
        endTime: new Date(),
        breakStart: new Date(),
        breakEnd: new Date(),
        maxLate: '10',
        classCode: ''
      },
      {
        id: 2,
        personId: 1,
        name: 'Introduction to Object Oriented Programming',
        description: '',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322297',
        isActive: false,
        dayOfWeek: 'Sunday',
        startTime: new Date(),
        endTime: new Date(),
        breakStart: new Date(),
        breakEnd: new Date(),
        maxLate: '15',
        classCode: ''
      },
      {
        id: 3,
        personId: 1,
        name: 'Artificial Intelligence',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322293',
        isActive: true,
        dayOfWeek: 'Monday',
        startTime: new Date(),
        endTime: new Date(),
        breakStart: new Date(),
        breakEnd: new Date(),
        maxLate: '5',
        classCode: ''
      },
      {
        id: 4,
        personId: 1,
        name: 'Operating System',
        description: 'bla bla bla',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322294',
        isActive: false,
        dayOfWeek: 'Sunday',
        startTime: new Date(),
        endTime: new Date(),
        breakStart: null,
        breakEnd: null,
        maxLate: '5',
        classCode: ''
      },
      {
        id: 5,
        personId: 1,
        name: 'Machine Learning',
        description: 'Lorem ipsum dolor sit amet, has hinc possit et, ei quot vitae sit.',
        platform: 'Zoom',
        link: 'https://us02web.zoom.us/j/89772322296',
        isActive: true,
        dayOfWeek: 'Sunday',
        startTime: new Date(),
        endTime: new Date(),
        breakStart: new Date(),
        breakEnd: new Date(),
        maxLate: '8',
        classCode: ''
      },
    ];

    // const students: IStudent[] = [
    //   {
    //     id: 1,
    //     fName: 'Jon',
    //     lName: 'Mile',
    //     birthId: '321321321',
    //     password: '7G39p85BX4'
    //   },
    //   {
    //     id: 2,
    //     fName: 'Roni',
    //     lName: 'Mile',
    //     birthId: '432432321',
    //     password: '3472fJN39j'
    //   },
    //   {
    //     id: 3,
    //     fName: 'david',
    //     lName: 'Ram',
    //     birthId: '257257257',
    //     password: 'p94U7d1q26'
    //   },
    // ];

    return { lessons }; // , students
  }
}
