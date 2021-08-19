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
    'https://datamanagementapi20210728183549.azurewebsites.net/api/Measurement/TestSignalR';

  private connection: signalR.HubConnection;

  public startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.remote) // { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets }
      .build();

    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.connection.on('TransferMeasurements', (data) => {
      this.emitMeasurements.next(data);
      console.log(data);
    });
  }

  constructor() {
    this.emitMeasurements = new BehaviorSubject<IMeasurement[]>(null);
  }
}