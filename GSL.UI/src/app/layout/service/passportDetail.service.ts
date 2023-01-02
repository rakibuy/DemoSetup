import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PassportDetail } from '../api/passportDetail';


@Injectable({
  providedIn: 'root'
})
export class PassportDetailService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<PassportDetail[]> {
  return this.httpClient.get<PassportDetail[]>(environment.baseUrl + '/PassportDetail/GetPassportDetail')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<PassportDetail> {
  return this.httpClient.post<PassportDetail>(environment.baseUrl + '/PassportDetail/AddPassportDetail', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<PassportDetail> {
  return this.httpClient.get<PassportDetail>(environment.baseUrl + '/PassportDetail/GetPassportDetailById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

findByUserId(id:any): Observable<PassportDetail> {
  return this.httpClient.get<PassportDetail>(environment.baseUrl + '/PassportDetail/GetPassportDetailByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<PassportDetail> {
  return this.httpClient.put<PassportDetail>(environment.baseUrl + '/PassportDetail/UpdatePassportDetail', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<PassportDetail>(environment.baseUrl + '/PassportDetail/Delete/' + id, this.httpOptions)
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
