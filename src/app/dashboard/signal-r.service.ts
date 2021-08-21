import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMeasurement } from './measurement.interface';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private currentDate: Date;

  public emitMeasurements: BehaviorSubject<IMeasurement[]>;

  private remote =
    'https://datamanagementapi20210728183549.azurewebsites.net/measurementsHub';

  private connection: signalR.HubConnection;

  public startConnection = () => {
    // Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    let options = {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.remote) //, options
      .build();

    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.connection.on('TransferMeasurements', (data) => {
      this.setCurrentDate();
      this.emitMeasurements.next(data);
    });
  };

  public isDataFinished(): boolean {
    if (this.currentDate) {
      let timeDiff = new Date().getTime() - this.currentDate.getTime();
      if (Math.round(timeDiff / 1000) < 120) {
        return false;
      }
      this.currentDate = null; 
    } 
    return true;
  }

  private setCurrentDate() {
    this.currentDate = new Date();
  }

  constructor() {
    this.emitMeasurements = new BehaviorSubject<IMeasurement[]>(null);
  }
}
