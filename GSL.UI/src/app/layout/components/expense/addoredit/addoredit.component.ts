import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { delay, findIndex, interval, timeInterval, timeout, timer, timestamp } from 'rxjs';

import { Country } from 'src/app/layout/api/countrie';
import { Payment, PaymentsDetails } from 'src/app/layout/api/payment';
import { Status } from 'src/app/layout/api/Status';

import { CountryService } from 'src/app/layout/service/country.service';
import { ExpenseService } from 'src/app/layout/service/expense.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {
  formvariant! : FormArray<any>
      payments: Payment[] = [];
      InvoiceNo:string="";
      INVOC:any;

      todayDate:any= new Date();
      TodayDate =this.datePipe.transform(this.todayDate,'yyyy-MM-dd');
      payment: Payment = {
        postingDate:this.TodayDate,
        voucherDate:this.TodayDate
      };
      paymentDetailsData:PaymentsDetails = {}
      editdata:any;
      id!:string;

      myPartyid:any;

      amountDetials:any={}
      singleAgreement:any = {};
      agreementList:any;
      //dropdown
      country:Country[]=[]
      countries: any[] = [];
      getAllWithoutStudetDropdown:any;
      valu:any;
      filteredCountries: any[] = [];
      studentSubject:any;
      staffNames:any;
      status!:Status[]
  
     
      submitted: boolean = false;
  
      cols: any[] = [];
      statuses: any[] = [];
  
      rowsPerPageOptions = [5, 10, 20];
      product!: {};
      
      constructor(
        private messageService: MessageService, 
        private countryService: CountryService,
        private registerService:RegisterService,
        private expenseService:ExpenseService,
        private datePipe:DatePipe,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        public subjectService: SubjectService,
        public userService:UserService,
        public router:Router
        ) { }

        
      ngOnInit(): void {
        this.getAllApply(this.payment);
        this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });

      this.userService.GetAllWithoutStudetDropdown().subscribe(data => {
        this.getAllWithoutStudetDropdown=data;
      })

      this.expenseService.InvoiceNo().subscribe(data =>{
        
        this.INVOC = data;
        this.InvoiceNo = this.INVOC.respons;
        

      });
      
      
      

      this.subjectService.getAll().subscribe(data=>{
        this.studentSubject=data;
      })
      this.userService.getAll().subscribe(data=>{
        this.staffNames = data;
      })

      this.status = [
        {name: 'Pending', code: 'pending'},
        {name: 'Complete', code: 'complete'},
        
    ];

    

    //
   
      //route selected
      
      this.id= this.route.snapshot.params['applyId'];
      
     
      if(this.id != undefined){
       
        
        
        //applyDetials table valu set
        this.expenseService.find(this.id).subscribe((data: any)=>{

          let voucherDateDateValu =this.datePipe.transform(data.voucherDate,'yyyy-MM-dd');
          let postingDateDateValu =this.datePipe.transform(data.postingDate,'yyyy-MM-dd');
          this.editdata = data;
          this.editdata.voucherDate=voucherDateDateValu;
          this.editdata.postingDate = postingDateDateValu;

          
          
          this.payment= data;
         
          if (this.editdata.paymentsDetails != null) {
            for (let i = 0; i < this.editdata.paymentsDetails.length; i++) {
              this.addDetailsItem();

              
            }
           
          }

          this.productform.setValue({
            id: this.editdata.id,
            partyId: this.editdata.partyId,
            voucherNo: this.editdata.voucherNo,
            postingDate: this.editdata.postingDate,
            narration:this.editdata.narration,
            voucherDate:this.editdata.voucherDate,
            totalAmount:this.editdata.totalAmount,
            agreementId:this.editdata.agreementId,
            partyName:this.editdata.partyName,
            totalAmountType:this.editdata.totalAmountType,
            paymentsDetails:this.editdata.paymentsDetails
          })

        

          
        });
        
      }else{
       
        this.addDetailsItem();
        
      }

      }
      getAllApply(payment: Payment){
        this.expenseService.getAll().subscribe((data: Payment[])=>{
        this.payments=data;
      })
    }

      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }
      

      addOrUpdateDetails(){
      this.submitted = true;
      
      
      Object.assign(this.payment, this.productform.value);

              if(this.payment.id){
                console.log(this.payment)
                this.expenseService.update(this.payment.id, this.payment).subscribe(res => {
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
                 
                })
              }
              else{

                console.log(this.payment)

                this.expenseService.create(this.payment).subscribe(res => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 })
                this.payment={}
                
                        this.productform=this.fb.group({
                          id: this.fb.control(0),
                          voucherNo: this.fb.control(''),
                          partyId: this.fb.control(0),
                          postingDate: this.fb.control(''),
                          voucherDate:this.fb.control('',),
                          narration:this.fb.control(''),
                          agreementId:this.fb.control(0),
                          totalAmount:this.fb.control({ value: 0, disabled: true }),
                          totalAmountType:this.fb.control('Debite'),
                          partyName:this.fb.control(''),
                          paymentsDetails: this.fb.array([])
                    
                    
                      })

                      this.amountDetials={}
                      this.singleAgreement= {};
                      
                this.ngOnInit();
                
                //this.amountDetials();
                
              

                })

                //this.router.navigate(['apply/list']);
              }
              this.payments = [...this.payments]
              
              //this.apply={};
            
            

    }



  //  Detials Table
  

get paymentsDetails(){
  return this.productform.controls['paymentsDetails'] as FormArray;
  
}

addDetailsItem():void{
 this.formvariant = this.productform.get("paymentsDetails") as FormArray;
this.formvariant.push(this.GenerateRow());
}

removeAtDetails(index:number):void{
  return this.paymentsDetails.removeAt(index)
}

GenerateRow() {
return this.fb.group({
  id:this.fb.control(0),
  paymentId:this.fb.control(0),
  amountTitle: this.fb.control('',[Validators.required]),
  amount: this.fb.control('', [Validators.required]),
  amountType:this.fb.control('Debit')
});
}







//product form
  productform=this.fb.group({
      id: this.fb.control(0),
      voucherNo: this.fb.control(''),
      partyId: this.fb.control(0,[Validators.required]),
      postingDate: this.fb.control('2022-02-28'),
      voucherDate:this.fb.control(''),
      narration:this.fb.control(''),
      agreementId:this.fb.control(0),
      totalAmount:this.fb.control(0),
      totalAmountType:this.fb.control('Credit'),
      partyName:this.fb.control(''),
      paymentsDetails: this.fb.array([],[Validators.required])


  })
 //get from   
 get f(){
  return this.productform.controls;
}

invoicedetail !: FormArray<any>;
invoiceproduct !: FormGroup<any>;


Itemcalculation(index: any){
  this.invoicedetail = this.productform.get("paymentsDetails") as FormArray;
  this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
  this.summarycalculation()
  
}

 summarycalculation() {
  let array = this.productform.getRawValue().paymentsDetails;
  let sumtotal = 0
  array.forEach((x: any) => {
     sumtotal = sumtotal + x.amount;
   });

   this.productform.get("totalAmount")?.setValue(sumtotal);

  }
  
  
  
  


    filterCountry(event: any) {
      const filtered: any[] = [];
      const query = event.query;
      for (let i = 0; i < this.countries.length; i++) {
          const country = this.countries[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
  
      this.filteredCountries = filtered;
  }

}
