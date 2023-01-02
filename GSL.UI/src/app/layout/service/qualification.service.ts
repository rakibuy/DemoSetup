import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Qualification } from '../api/qualification';



@Injectable({
  providedIn: 'root'
})
export class QualificationService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Qualification[]> {
  return this.httpClient.get<Qualification[]>(environment.baseUrl + '/AcademicQualification/GetAllAcademicQualification')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Qualification> {
  return this.httpClient.post<Qualification>(environment.baseUrl + '/AcademicQualification/AddAcademicQualification', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Qualification> {
  return this.httpClient.get<Qualification>(environment.baseUrl + '/AcademicQualification/GetAcademicQualificationById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

findByUserId(id:number): Observable<Qualification> {
  return this.httpClient.get<Qualification>(environment.baseUrl + '/AcademicQualification/GetAcademicQualificationByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Qualification> {
  return this.httpClient.put<Qualification>(environment.baseUrl + '/AcademicQualification/UpdateAcademicQualification', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Qualification>(environment.baseUrl + '/AcademicQualification/Delete/' + id, this.httpOptions)
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
