import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exam } from '../api/exam';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Exam[]> {
  return this.httpClient.get<Exam[]>(environment.baseUrl + '/Exam/GetAllExam')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Exam> {
  return this.httpClient.post<Exam>(environment.baseUrl + '/Exam/AddExam', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Exam> {
  return this.httpClient.get<Exam>(environment.baseUrl + '/Exam/GetExamById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Exam> {
  return this.httpClient.put<Exam>(environment.baseUrl + '/Exam/UpdateExam', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Exam>(environment.baseUrl + '/Exam/Delete/' + id, this.httpOptions)
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
