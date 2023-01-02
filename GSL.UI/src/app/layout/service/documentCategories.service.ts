import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentCategory, DocumentSubCategory } from '../api/documentCategories';



@Injectable({
  providedIn: 'root'
})
export class DocumentCategoriesService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<DocumentSubCategory[]> {
  return this.httpClient.get<DocumentSubCategory[]>(environment.baseUrl + '/DocumentCategories/GetAllSubCategory')
  .pipe(
    catchError(this.errorHandler)
  )
}



findBysubCategory(id:any): Observable<DocumentCategory> {
  return this.httpClient.get<DocumentCategory>(environment.baseUrl + '/DocumentCategories/GetCategorieBySubId?id=' + id)
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
