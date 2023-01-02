import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentService } from './payment.service';



@Injectable({
  providedIn: 'root'
})
export class ReportService {

constructor(
    private httpClient: HttpClient,
    private paymentPdfService: PaymentService
    ) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


}
