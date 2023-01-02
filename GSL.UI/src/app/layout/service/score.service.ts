import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Score } from '../api/score';



@Injectable({
  providedIn: 'root'
})
export class ScoreService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Score[]> {
  return this.httpClient.get<Score[]>(environment.baseUrl + '/Score/GetAllScore')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Score> {
  return this.httpClient.post<Score>(environment.baseUrl + '/Score/AddScore', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Score> {
  return this.httpClient.get<Score>(environment.baseUrl + '/Score/GetScoreById?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

findByUserId(id:number): Observable<Score> {
  return this.httpClient.get<Score>(environment.baseUrl + '/Score/GetScoreByUserId?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Score> {
  return this.httpClient.put<Score>(environment.baseUrl + '/Score/UpdateScore', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:any){
  return this.httpClient.delete<Score>(environment.baseUrl + '/Score/Delete/' + id, this.httpOptions)
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
