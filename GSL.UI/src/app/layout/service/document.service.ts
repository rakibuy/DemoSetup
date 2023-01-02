import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Degree } from '../api/degree';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Document[]> {
  return this.httpClient.get<Document[]>(environment.baseUrl + '/Degree/GetAllDegrees')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(degree:any): Observable<Document> {
  return this.httpClient.post<Document>(environment.baseUrl + '/Degree/AddDegree', JSON.stringify(degree), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Document> {
  return this.httpClient.get<Document>(environment.baseUrl + '/Degree/GetDegreeById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

// download(fileName:any): Observable<Document> {
//   return this.httpClient.get<Document>(environment.baseUrl + '/Documents/DocumentReports/DocumentReports?fileName=' + fileName)
//   .pipe(
//     catchError(this.errorHandler)
//   )
// }
 
download(fileName: string) {
  return this.httpClient.get(environment.baseUrl + '/Documents/DocumentReports/DocumentReports?fileName=' + fileName, {
    observe:'response', responseType:'blob'
  })
}




findByUserId(id:any): Observable<Document> {
  return this.httpClient.get<Document>(environment.baseUrl + '/Documents/GetDocumentByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Document> {
  return this.httpClient.put<Document>(environment.baseUrl + '/Degree/UpdateSubject', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}



delete(id:any){
  return this.httpClient.delete<Document>(environment.baseUrl + '/Documents/Delete/' + id, this.httpOptions)
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
