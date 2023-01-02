import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/layout/api/payment';
import { PaymentService } from 'src/app/layout/service/payment.service';
import jsPDF from 'jspdf';
import { InvoicePdf } from 'src/app/layout/api/InvoicePdf';


@Component({
    templateUrl: './payment.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PaymentComponent implements OnInit {

  //Personal Information
 
  payments: Payment[] = [];
  payment: Payment = {};

  getSingleInvoiceById:InvoicePdf = {}

  

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

    singlePaymentpdf(id:number){
      this.paymentService.getSingleInvoiceBYId(id).subscribe(data=>{
        this.getSingleInvoiceById = data;
        console.log(this.getSingleInvoiceById)
      })
      if(this.getSingleInvoiceById != null){
        this.exportPDF();
      }
    }

       @ViewChild('contentJsPdf', {static:false}) el!:ElementRef;
       
       exportPDF(){


        let pdf = new jsPDF('p', "pt", "a4")
        pdf.html(this.el.nativeElement,
          // Adjust your margins here (left, top, right ,bottom)
          {
          margin: [30, 0, 20, 0],
          callback:(pdf)=>{
            //pdf.save("sample.pdf")
            pdf.output('dataurlnewwindow');
          }
        })

        

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
