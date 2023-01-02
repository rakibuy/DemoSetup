import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Documents } from '../api/documents';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Documents[]> {
  return this.httpClient.get<Documents[]>(environment.baseUrl + '/Document/GetAllApplyMaster')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllDetials(): Observable<Documents[]> {
  return this.httpClient.get<Documents[]>(environment.baseUrl + '/Document/GetAllApplyDetails')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Documents> {
  return this.httpClient.post<Documents>(environment.baseUrl + '/Document/AddDocument', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

upload(session:any): Observable<File> {
  return this.httpClient.post<File>('https://localhost:7103/api/Document/Uploadd', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Documents> {
  return this.httpClient.get<Documents>(environment.baseUrl + '/Document/GetAllData?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Documents> {
  return this.httpClient.put<Documents>(environment.baseUrl + '/Apply/UpdateApply', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Documents>(environment.baseUrl + '/AssignJob/Delete/' + id, this.httpOptions)
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
