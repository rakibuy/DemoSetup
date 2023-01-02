import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from '../api/register';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {



constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Register[]> {
  return this.httpClient.get<Register[]>(environment.baseUrl + '/Registration/GetAllRegistration')
  .pipe(
    catchError(this.errorHandler)
  )
}

GetRegistrationWithoutAgreements(): Observable<Register[]> {
  return this.httpClient.get<Register[]>(environment.baseUrl + '/Registration/GetRegistrationWithoutAgreements')
  .pipe(
    catchError(this.errorHandler)
  )
}

getCount(): Observable<Register[]> {
  return this.httpClient.get<Register[]>(environment.baseUrl + '/User/GetAllStudentount')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Register> {
  return this.httpClient.post<Register>(environment.baseUrl + '/Registration/AddRegistration', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Register> {
  return this.httpClient.get<Register>(environment.baseUrl + '/Registration/GetAllData?id='+id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Register> {
  return this.httpClient.put<Register>(environment.baseUrl + '/Registration/UpdateRegistration', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Register>(environment.baseUrl + '/Registration/Delete/' + id, this.httpOptions)
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
