import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonalInformation } from '../api/PersonalInformation';


@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<PersonalInformation[]> {
  return this.httpClient.get<PersonalInformation[]>(environment.baseUrl + '/PersonalInformation/GetAllPersonalInformation')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<PersonalInformation> {
  return this.httpClient.post<PersonalInformation>(environment.baseUrl + '/PersonalInformation/AddPersonalInformation', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<PersonalInformation> {
  return this.httpClient.get<PersonalInformation>(environment.baseUrl + '/PersonalInformation/GetPersonalInformationById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

GetUserById(id:any): Observable<PersonalInformation> {
  return this.httpClient.get<PersonalInformation>(environment.baseUrl + '/PersonalInformation/GetPersonalInformationByUserID?userId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<PersonalInformation> {
  return this.httpClient.put<PersonalInformation>(environment.baseUrl + '/PersonalInformation/UpdatePersonalInformation', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<PersonalInformation>(environment.baseUrl + '/PersonalInformation/Delete/' + id, this.httpOptions)
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
