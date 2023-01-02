import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session } from '../api/session';
import { EmbassyDocument } from '../api/embassyDocument';


@Injectable({
  providedIn: 'root'
})
export class EmbassyDocumentService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<EmbassyDocument[]> {
  return this.httpClient.get<EmbassyDocument[]>(environment.baseUrl + '/EmbassyDocumentDetail/GetEmbassyDocumentDetail')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<EmbassyDocument> {
  return this.httpClient.post<EmbassyDocument>(environment.baseUrl + '/EmbassyDocumentDetail/AddEmbassyDocumentDetail', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<EmbassyDocument> {
  return this.httpClient.get<EmbassyDocument>(environment.baseUrl + '/EmbassyDocumentDetail/GetEmbassyDocumentDetailById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<EmbassyDocument> {
  return this.httpClient.put<EmbassyDocument>(environment.baseUrl + '/EmbassyDocumentDetail/UpdateEmbassyDocumentDetail', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<EmbassyDocument>(environment.baseUrl + '/EmbassyDocumentDetail/Delete/' + id, this.httpOptions)
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
