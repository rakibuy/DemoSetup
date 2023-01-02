import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobAssign } from '../api/jobassign';



@Injectable({
  providedIn: 'root'
})
export class JobAssignService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<JobAssign[]> {
  return this.httpClient.get<JobAssign[]>(environment.baseUrl + '/JobAssign/GetAllMaster')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllDetials(): Observable<JobAssign[]> {
  return this.httpClient.get<JobAssign[]>(environment.baseUrl + '/JobAssign/GetAllDetails')
  .pipe(
    catchError(this.errorHandler)
  )
}

GetAllJobDetailByStafId(id:any): Observable<JobAssign> {
  return this.httpClient.get<JobAssign>(environment.baseUrl + '/JobAssign/GetAllJobDetailByStafId?jobAssignId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}
GetAllJobDetailBycouncilorId(id:any): Observable<JobAssign> {
  return this.httpClient.get<JobAssign>(environment.baseUrl + '/JobAssign/GetAllJobDetailBycouncilorId?CouncilorId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

// getAllDetials(): Observable<JobAssign[]> {
//   return this.httpClient.get<JobAssign[]>(environment.baseUrl + '/AssignJob/GetAllJobDetials')
//   .pipe(
//     catchError(this.errorHandler)
//   )
// }

create(session:any): Observable<JobAssign> {
  return this.httpClient.post<JobAssign>(environment.baseUrl + '/JobAssign/AddJob', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<JobAssign> {
  return this.httpClient.get<JobAssign>(environment.baseUrl + '/JobAssign/GetAllData?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllDetialById(id:any): Observable<JobAssign> {
  return this.httpClient.get<JobAssign>(environment.baseUrl + '/JobAssign/GetAllJobDetailById?jobAssignId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<JobAssign> {
  return this.httpClient.put<JobAssign>(environment.baseUrl + '/JobAssign/UpdateJob', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<JobAssign>(environment.baseUrl + '/AssignJob/Delete/' + id, this.httpOptions)
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
