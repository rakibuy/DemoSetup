import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../api/payment';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<Payment[]> {
  return this.httpClient.get<Payment[]>(environment.baseUrl + '/Payment/GetAllPayment')
  .pipe(
    catchError(this.errorHandler)
  )
}

getCount(): Observable<Payment[]> {
  return this.httpClient.get<Payment[]>(environment.baseUrl + '/Payment/GetAllPayment')
  .pipe(
    catchError(this.errorHandler)
  )
}

InvoiceNo(): Observable<Payment[]> {
  return this.httpClient.get<Payment[]>(environment.baseUrl + '/Payment/InvoiceNo')
  .pipe(
    catchError(this.errorHandler)
  )
}

getAllDetials(): Observable<Payment[]> {
  return this.httpClient.get<Payment[]>(environment.baseUrl + '/AssignJob/GetAllJobDetials')
  .pipe(
    catchError(this.errorHandler)
  )
}

create(session:any): Observable<Payment> {
  return this.httpClient.post<Payment>(environment.baseUrl + '/Payment/AddPayment', JSON.stringify(session), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:any): Observable<Payment> {
  return this.httpClient.get<Payment>(environment.baseUrl + '/Payment/GetAllData?id=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}
getSingleInvoiceBYId(id:any){
  return this.httpClient.get<any>(environment.baseUrl + '/Payment/InvoicePdf?PaymenId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

amountDetials(id:any): Observable<Payment> {
  return this.httpClient.get<Payment>(environment.baseUrl + '/Payment/AmountDetials?UserId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

singleAmountDetials(id:any): Observable<Payment> {
  return this.httpClient.get<Payment>(environment.baseUrl + '/Payment/SingleAmountDetials?agreementId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

agreementDropdown(id:any): Observable<Payment> {
  return this.httpClient.get<Payment>(environment.baseUrl + '/Payment/agreementDropDownList?UserId=' + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:any, post:any): Observable<Payment> {
  return this.httpClient.put<Payment>(environment.baseUrl + '/Payment/UpdatePayment', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}


 
delete(id:any){
  return this.httpClient.delete<Payment>(environment.baseUrl + '/AssignJob/Delete/' + id, this.httpOptions)
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
