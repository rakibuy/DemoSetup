import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Email } from '../api/email';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}





create(email:any): Observable<Email> {
  return this.httpClient.post<Email>(environment.baseUrl + "/Email/SendMailUser"  , JSON.stringify(email), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}








errorHandler(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
