import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplyMaster } from '../api/apply';


@Injectable({
  providedIn: 'root'
})
export class ApplyService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<ApplyMaster[]> {
  return this.httpClient.get<ApplyMaster[]>(environment.baseUrl + '/Apply/GetAllApply')
  .pipe(
    catchError(this.errorHandler)
  )
}

getCount(): Observable<ApplyMaster[]> {
  return this.httpClient.get<ApplyMaster[]>(environment.baseUrl + '/Applys/GetAllApplyCount')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllDetials(): Observable<ApplyMaster[]> {
  return this.httpClient.get<ApplyMaster[]>(environment.baseUrl + '/AssignJob/GetAllJobDetials')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<ApplyMaster> {
  return this.httpClient.post<ApplyMaster>(environment.baseUrl + '/Apply/AddApply', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<ApplyMaster> {
  return this.httpClient.get<ApplyMaster>(environment.baseUrl + '/Apply/GetAllData?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<ApplyMaster> {
  return this.httpClient.put<ApplyMaster>(environment.baseUrl + '/Apply/UpdateApply', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}
 
delete(id:any){
  return this.httpClient.delete<ApplyMaster>(environment.baseUrl + '/AssignJob/Delete/' + id, this.httpOptions)
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
