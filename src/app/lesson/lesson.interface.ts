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
    breakStart: string;
    breakEnd: string;
    maxLate: string;
}