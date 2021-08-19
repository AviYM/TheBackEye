import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMeasurement } from './measurement.interface';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
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
      .withUrl(this.remote, options)
      .build();

    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.connection.on('TransferMeasurements', (data) => {
      //debugger
      this.emitMeasurements.next(data);
      console.log('```````````````````````````````' + data);
    });
  };

  constructor() {
    this.emitMeasurements = new BehaviorSubject<IMeasurement[]>(null);
  }
}
