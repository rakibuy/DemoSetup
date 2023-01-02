import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Year } from '../api/year';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Year[]> {
    return this.httpClient.get<Year[]>(environment.baseUrl + '/Years/GetAllYear')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(year:any): Observable<Year> {
    return this.httpClient.post<Year>(environment.baseUrl + '/Years/AddYear', JSON.stringify(year), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id:any): Observable<Year> {
    return this.httpClient.get<Year>(environment.baseUrl + '/Years/GetYearById?id=' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id:any, post:any): Observable<Year> {
    return this.httpClient.put<Year>(environment.baseUrl + '/Years/UpdateYear', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id:any){
    return this.httpClient.delete<Year>(environment.baseUrl + '/Years/Delete/' + id, this.httpOptions)
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