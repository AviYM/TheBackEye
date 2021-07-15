import { Injectable } from '@angular/core';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logWithDate: boolean = true;

  constructor() { }

  private shouldLog(level: LogLevel): boolean {
    if (level !== LogLevel.Off && level >= LogLevel.All) {
      return true;
    }

    return false;
  }

  private writeToLog(msg: any, level: LogLevel) {
    if (this.shouldLog(level)) {

      let value: string = "";
      if (this.logWithDate) {
        value = new Date() + ' - ';
      }

      value += "Type: " + LogLevel[level];
      value += " - Message: " + JSON.stringify(msg);

      // Log the value
      level === LogLevel.Error ? console.error(value) : console.log(value);
    }
  }

  info(msg: any) {
    this.writeToLog(msg, LogLevel.Info);
  }

  debug(msg: any) {
    this.writeToLog(msg, LogLevel.Debug);
  }

  error(msg: any) {
    this.writeToLog(msg, LogLevel.Error);
  }

  log(msg: any) {
    this.writeToLog(msg, LogLevel.All);
  }
}
