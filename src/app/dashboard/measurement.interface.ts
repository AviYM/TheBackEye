export interface IMeasurement {
  id: number;
  dateTime: Date | string;
  headPose: boolean;
  faceRecognition: boolean;
  sleepDetector: boolean;
  onTop: boolean;
  faceDetector: boolean;
  objectDetection: boolean;
  soundCheck: boolean;
  lessonId: number;
  personId: number;
}

export interface NameValueMap {
  name: string;
  value: number;
}
