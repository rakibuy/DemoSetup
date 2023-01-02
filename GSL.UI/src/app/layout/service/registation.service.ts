import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Registation } from '../api/registation';


@Injectable({
  providedIn: 'root'
})
export class RegistetionService {



constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Registation[]> {
  return this.httpClient.get<Registation[]>(environment.baseUrl + '/Registration/GetAllRegistration')
  .pipe(
    catchError(this.errorHandler)
  )
}

dropdownVisitor(): Observable<Registation[]> {
  return this.httpClient.get<Registation[]>(environment.baseUrl + '/Registration/DropdownVisitor')
  .pipe(
    catchError(this.errorHandler)
  )
}

getUnAssignVisitor(): Observable<Registation[]> {
  return this.httpClient.get<Registation[]>(environment.baseUrl + '/Registration/GetAllUnAssignVisitor')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAssignVisitor(): Observable<Registation[]> {
  return this.httpClient.get<Registation[]>(environment.baseUrl + '/Registration/GetAllAssignVisitor')
  .pipe(
    catchError(this.errorHandler)
  )
}




getCount(): Observable<Registation[]> {
  return this.httpClient.get<Registation[]>(environment.baseUrl + '/Registration/GetAllRegistrationCount')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Registation> {
  return this.httpClient.post<Registation>(environment.baseUrl + '/Registration/AddRegistration', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Registation> {
  return this.httpClient.get<Registation>(environment.baseUrl + '/Registration/GetAllData?id='+id)
  .pipe(
    catchError(this.errorHandler)
  )
}
visitorInfo(id:any): Observable<Registation> {
  return this.httpClient.get<Registation>(environment.baseUrl + '/Registration/GetVisitorByUserId?UserId='+id)
  .pipe(
    catchError(this.errorHandler)
  )
}
update(id:any, post:any): Observable<Registation> {
  return this.httpClient.put<Registation>(environment.baseUrl + '/Registration/UpdateRegistration', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Registation>(environment.baseUrl + '/Registration/Delete/' + id, this.httpOptions)
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
