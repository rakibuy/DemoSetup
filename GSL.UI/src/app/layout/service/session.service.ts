import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session } from '../api/session';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Session[]> {
  return this.httpClient.get<Session[]>(environment.baseUrl + '/Session/GetAllSessions')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Session> {
  return this.httpClient.post<Session>(environment.baseUrl + '/Session/AddSession', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Session> {
  return this.httpClient.get<Session>(environment.baseUrl + '/Session/GetSessionById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Session> {
  return this.httpClient.put<Session>(environment.baseUrl + '/Session/UpdateSession', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Session>(environment.baseUrl + '/Session/Delete/' + id, this.httpOptions)
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
