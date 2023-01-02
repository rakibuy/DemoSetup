import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agreement } from '../api/agreement';
import { dropDownVM } from '../api/dropDownVM';


@Injectable({
  providedIn: 'root'
})
export class AgreementService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Agreement[]> {
  return this.httpClient.get<Agreement[]>(environment.baseUrl + '/Agreement/GetAgreementInformation')
  .pipe(
    catchError(this.errorHandler)
  )
}


getCount(): Observable<Agreement[]> {
  return this.httpClient.get<Agreement[]>(environment.baseUrl + '/Agreement/GetAllAgreementCount')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Agreement> {
  return this.httpClient.post<Agreement>(environment.baseUrl + '/Agreement/AddAgreement', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Agreement> {
  return this.httpClient.get<Agreement>(environment.baseUrl + '/Agreement/GetAgreementById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownCouncilrByUserId(id:any): Observable<any> {
  return this.httpClient.get<any>(environment.baseUrl + '/Agreement/DropdownCouncilrByUserId?UserId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

findByUserId(id:number): Observable<Agreement> {
  return this.httpClient.get<Agreement>(environment.baseUrl + '/Agreement/GetAgreementByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Agreement> {
  return this.httpClient.put<Agreement>(environment.baseUrl + '/Agreement/UpdateAgreement', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Agreement>(environment.baseUrl + '/Agreement/Delete/' + id, this.httpOptions)
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
