import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lead } from '../api/lead';



@Injectable({
  providedIn: 'root'
})
export class LeadService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Lead[]> {
  return this.httpClient.get<Lead[]>(environment.baseUrl + '/Leads/GetLeads')
  .pipe(
    catchError(this.errorHandler)
  )
}

getCount(): Observable<Lead[]> {
  return this.httpClient.get<Lead[]>(environment.baseUrl + '/University/GetAllUniversitiesCount')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(university:any): Observable<Lead> {
  return this.httpClient.post<Lead>(environment.baseUrl + '/Leads/AddLead', JSON.stringify(university), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Lead> {
  return this.httpClient.get<Lead>(environment.baseUrl + '/University/GetUniversityById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Lead> {
  return this.httpClient.put<Lead>(environment.baseUrl + '/University/UpdateUniversity', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Lead>(environment.baseUrl + '/University/Delete/' + id, this.httpOptions)
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
