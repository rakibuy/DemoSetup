import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/layout/api/payment';
import { PaymentService } from 'src/app/layout/service/payment.service';
import { paymentPdf } from 'src/app/layout/api/paymnetPdf';
import { PaymentPdfService } from 'src/app/layout/service/paymentPdf.service';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
    templateUrl: './receive.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ReceiveComponent implements OnInit {

  //Personal Information
 
  paymentPdfs: paymentPdf[] = [];
  paymentPdf: paymentPdf = {};

  FromDate:any;
  ToDate:any;

//common
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    displayOption:string = "none";
    displayOptionhead:string="block"
    routeId:any;

    constructor(
      private messageService: MessageService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private paymentPdfService: PaymentPdfService,
      private route:ActivatedRoute,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {

      //route selected
      
     

    }
    paymentPdfButton(formDate:any, ToDate:any){
      
      this.paymentPdfService.paymentPdfCreate(formDate, ToDate).subscribe(date=>{
        this.paymentPdf = date;
        
            this.displayOption= "block";
            this.displayOptionhead = "none"

            console.log(this.paymentPdf)
          
      })
     

      
    }

    redirectPage(){
      this.displayOption= "none";
            this.displayOptionhead = "block"
    }
    

    @ViewChild('contentJsPdf', {static:false}) el!:ElementRef;
   
       exportPDF(){

        this.ngOnInit();
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
    

}
