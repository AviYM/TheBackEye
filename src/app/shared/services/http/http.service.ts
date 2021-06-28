import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private logger: LogService) { }

  getItems(path: string) {
    this.logger.log(path);
    this.logger.log("HttpService.getItems is called");
  }

  getItem(path: string, id: number) {
    this.logger.log(path);
    this.logger.log("HttpService.getItem is called");
  }

}
