import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/layout/api/payment';
import { PaymentService } from 'src/app/layout/service/payment.service';


@Component({
    templateUrl: './pending.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PendingComponent implements OnInit {

  //Personal Information
 
  payments: Payment[] = [];
  payment: Payment = {};

  

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private paymentService:PaymentService,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {
      //Personal Information
      this.getAllApply(this.payment);

    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
    getAllApply(applyMaster: Payment){
      this.paymentService.getAll().subscribe((data: Payment[])=>{
      this.payments=data; 
     
    })
}
}
