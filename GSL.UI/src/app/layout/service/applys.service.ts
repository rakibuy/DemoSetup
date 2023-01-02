import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Applys } from '../api/applys';



@Injectable({
  providedIn: 'root'
})
export class ApplysService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Applys[]> {
  return this.httpClient.get<Applys[]>(environment.baseUrl + '/Applys/GetAllApply')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Applys> {
  return this.httpClient.post<Applys>(environment.baseUrl + '/Applys/AddApply', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Applys> {
  return this.httpClient.get<Applys>(environment.baseUrl + '/Applys/GetScoreById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownAgrementByUserId(id:any): Observable<any> {
  return this.httpClient.get<any>(environment.baseUrl + '/Agreement/AgreementDropDownByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

GetByUserId(id:number): Observable<Applys> {
  return this.httpClient.get<Applys>(environment.baseUrl + '/Applys/GetApplyByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Applys> {
  return this.httpClient.put<Applys>(environment.baseUrl + '/Applys/UpdateApply', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Applys>(environment.baseUrl + '/Applys/Delete/' + id, this.httpOptions)
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
