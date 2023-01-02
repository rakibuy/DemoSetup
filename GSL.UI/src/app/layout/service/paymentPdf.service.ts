import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { paymentPdf } from '../api/paymnetPdf';



@Injectable({
  providedIn: 'root'
})
export class PaymentPdfService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


paymentPdfCreate(fromDate:any, toDate:any): Observable<paymentPdf> {
  return this.httpClient.get<paymentPdf>(environment.baseUrl + '/PaymentPdf/GetAllPayment?fromDate=' + fromDate + '&toDate=' + toDate)
  .pipe(
    catchError(this.errorHandler)
  )
}

expencePdfCreate(fromDate:any, toDate:any): Observable<paymentPdf> {
  return this.httpClient.get<paymentPdf>(environment.baseUrl + '/PaymentPdf/GetAllExpense?fromDate=' + fromDate + '&toDate=' + toDate)
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
