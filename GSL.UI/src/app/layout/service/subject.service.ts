import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from '../api/subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Subject[]> {
  return this.httpClient.get<Subject[]>(environment.baseUrl + '/Subject/GetSubjects')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(subject:any): Observable<Subject> {
  return this.httpClient.post<Subject>(environment.baseUrl + '/Subject/AddSubject', JSON.stringify(subject), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Subject> {
  return this.httpClient.get<Subject>(environment.baseUrl + '/Subject/GetSubjectById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Subject> {
  return this.httpClient.put<Subject>(environment.baseUrl + '/Subject/UpdateSubject', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Subject>(environment.baseUrl + '/Subject/Delete/' + id, this.httpOptions)
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
