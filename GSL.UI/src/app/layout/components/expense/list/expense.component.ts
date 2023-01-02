import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/layout/api/payment';
import { PaymentService } from 'src/app/layout/service/payment.service';
import jsPDF from 'jspdf';
import { InvoicePdf } from 'src/app/layout/api/InvoicePdf';
import { ExpenseService } from 'src/app/layout/service/expense.service';


@Component({
    templateUrl: './expense.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ExpenseComponent implements OnInit {

  //Personal Information
 
  expenses: Payment[] = [];
  expense: Payment = {};

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
      private expenseService:ExpenseService,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {
      //Personal Information
      this.getAllExpense(this.expense);
      
    }

    singlePaymentpdf(id:number){
      this.expenseService.getSingleInvoiceBYId(id).subscribe(data=>{
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
    getAllExpense(data: Payment){
      this.expenseService.getAll().subscribe((data: Payment[])=>{
      this.expenses=data; 
      
     
    })
}
}
