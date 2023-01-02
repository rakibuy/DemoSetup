import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Degree } from '../api/degree';


@Injectable({
  providedIn: 'root'
})
export class DegreeService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Degree[]> {
  return this.httpClient.get<Degree[]>(environment.baseUrl + '/Degree/GetAllDegrees')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(degree:any): Observable<Degree> {
  return this.httpClient.post<Degree>(environment.baseUrl + '/Degree/AddDegree', JSON.stringify(degree), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Degree> {
  return this.httpClient.get<Degree>(environment.baseUrl + '/Degree/GetDegreeById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Degree> {
  return this.httpClient.put<Degree>(environment.baseUrl + '/Degree/UpdateSubject', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Degree>(environment.baseUrl + '/Degree/Delete/' + id, this.httpOptions)
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
