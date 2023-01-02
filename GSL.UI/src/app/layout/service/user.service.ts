import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../api/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllUser')
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownCouncilor(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/DropdownCouncilor')
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownStaf(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/DropdownStaf')
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownStudent(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/DropdownStudent')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllStaf(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllStaf')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllAdmin(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllAdmin')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllVisitor(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllVisitor')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllCouncilor(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllCouncilor')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllAccounting(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllAccounting')
  .pipe(
    catchError(this.errorHandler)
  )
}


getAllStudent(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllStudet')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllStudentDropdown(): Observable<any[]> {
  return this.httpClient.get<any[]>(environment.baseUrl + '/User/GetAllStudetDropdown')
  .pipe(
    catchError(this.errorHandler)
  )
}

GetAllWithoutStudetDropdown(): Observable<any[]> {
  return this.httpClient.get<any[]>(environment.baseUrl + '/User/GetAllWithoutStudetDropdown')
  .pipe(
    catchError(this.errorHandler)
  )
}

GetAllJobUnAssignStudet(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllJobUnAssignStudent')
  .pipe(
    catchError(this.errorHandler)
  )
}

GetAllJobAssignStudet(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllJobAssignStudet')
  .pipe(
    catchError(this.errorHandler)
  )
}


create(session:any): Observable<User> {
  return this.httpClient.post<User>(environment.baseUrl + '/User/AddUser', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

loginUser(session:any): Observable<User> {
  return this.httpClient.post<User>(environment.baseUrl + '/JWTToken', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

CreateStudent(id:any): Observable<User> {
  return this.httpClient.get<User>(environment.baseUrl + '/User/AddStudent?UserDetialId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}



find(id:any): Observable<User> {
  return this.httpClient.get<User>(environment.baseUrl + '/User/GetUserById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

unAssignThisJob(id:any): Observable<User> {
  return this.httpClient.get<User>(environment.baseUrl + '/User/unAssignThisJob?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}



update(id:any, post:any): Observable<User> {
  return this.httpClient.put<User>(environment.baseUrl + '/User/UpdateUser', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}


updatePassChange(id:any, post:any): Observable<User> {
  return this.httpClient.put<User>(environment.baseUrl + '/User/EditPassChange', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}
delete(id:any){
  return this.httpClient.delete<User>(environment.baseUrl + '/User/Delete/' + id, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}


GenerateProfilePdf(id:any){
  return this.httpClient.get(environment.baseUrl + '/ProfilePdf/generateprofilepdf?id=' + id,{
    observe:'response', responseType:'blob'
  })
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
