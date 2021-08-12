import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';

interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly END_POINT: string;

  constructor(private http: HttpClient, private logger: LogService) {
    this.END_POINT = environment.api.baseUrl; //`${environment.api.baseUrl}`
  }

  public create<T>(route: string, item: T | string, hdrs?: any): Observable<T> {
    const headers = new HttpHeaders(hdrs);
    return this.http
      .post<T>(`${this.END_POINT}/${route}`, item, { headers })
      .pipe(
        tap((data) => this.logger.log('createItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public read<T>(route: string, hdrs?: any): Observable<T> {
    let url = `${this.END_POINT}/${route}`;
    const headers = new HttpHeaders(hdrs);
    this.logger.log('HttpService.read is called with: ' + url);
    // const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http.get<T>(url, { headers }).pipe(
      tap((data) => this.logger.log('readItem: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public update<T>(route: string, item: T, hdrs?: any): Observable<T> {
    const headers = new HttpHeaders(hdrs);
    return this.http
      .put<T>(`${this.END_POINT}/${route}`, item, { headers })
      .pipe(
        tap((data) => this.logger.log('updateItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public delete<T>(route: string, id: number | string, hdrs?: any): Observable<T> {
    const headers = new HttpHeaders(hdrs);
    return this.http
      .delete<T>(`${this.END_POINT}/${route}/${id}`, { headers })
      .pipe(
        tap((data) => this.logger.log('deleteItem: ' + id)),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error accurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private correctFormatForQueryUrl(qp: QueryParams): string {
    if (qp == null) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }

  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }
}
