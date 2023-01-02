import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {University } from '../api/university';


@Injectable({
  providedIn: 'root'
})
export class UniversityService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<University[]> {
  return this.httpClient.get<University[]>(environment.baseUrl + '/University/GetUniversities')
  .pipe(
    catchError(this.errorHandler)
  )
}

getCount(): Observable<University[]> {
  return this.httpClient.get<University[]>(environment.baseUrl + '/University/GetAllUniversitiesCount')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(university:any): Observable<University> {
  return this.httpClient.post<University>(environment.baseUrl + '/University/AddUniversity', JSON.stringify(university), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<University> {
  return this.httpClient.get<University>(environment.baseUrl + '/University/GetUniversityById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<University> {
  return this.httpClient.put<University>(environment.baseUrl + '/University/UpdateUniversity', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<University>(environment.baseUrl + '/University/Delete/' + id, this.httpOptions)
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
