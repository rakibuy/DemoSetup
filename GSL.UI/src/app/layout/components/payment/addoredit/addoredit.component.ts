import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Country } from 'src/app/layout/api/countrie';
import { Payment, PaymentsDetails } from 'src/app/layout/api/payment';
import { Status } from 'src/app/layout/api/Status';
import { CountryService } from 'src/app/layout/service/country.service';
import { PaymentService } from 'src/app/layout/service/payment.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {

      formvariant! : FormArray<any>

      //current Date
      todayDate:any= new Date();
      TodayDate =this.datePipe.transform(this.todayDate,'yyyy-MM-dd');

      //payment info start
      payments: Payment[] = [];
      InvoiceNo:string="";
      INVOC:any;
      
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

      //dropdown List
      country:Country[]=[]
      countries: any[] = [];
      gelAllStudentDropdown:any;
      valu:any;
      filteredCountries: any[] = [];
      studentSubject:any;
      staffNames:any;
      status!:Status[]
  
     
      //common 
      submitted: boolean = false;
      cols: any[] = [];
      statuses: any[] = [];
      rowsPerPageOptions = [5, 10, 20];
     
      
      
      constructor(
        private messageService: MessageService, 
        private countryService: CountryService,
        private registerService:RegisterService,
        private paymentService:PaymentService,
        private datePipe:DatePipe,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        public subjectService: SubjectService,
        public userService:UserService,
        public router:Router
        ) { }

        
      ngOnInit(): void {

        //payment list
        this.getAllApply(this.payment);
        this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });

      //Student Dropdown
      this.userService.getAllStudentDropdown().subscribe(data => {
        this.gelAllStudentDropdown=data;
      })

      //Invoice Auto Set
      this.paymentService.InvoiceNo().subscribe(data =>{
        this.INVOC = data;
        this.InvoiceNo = this.INVOC.respons;
      });
      
      //---------------------------------
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
     //---------------------------------

      //route selected
      this.id= this.route.snapshot.params['applyId'];

      if(this.id != undefined){

        //Payment Detials table valu set for Edit
        this.paymentService.find(this.id).subscribe((data: any)=>{

          let voucherDateDateValu =this.datePipe.transform(data.voucherDate,'yyyy-MM-dd');
          let postingDateDateValu =this.datePipe.transform(data.postingDate,'yyyy-MM-dd');
          this.editdata = data;
          this.editdata.voucherDate=voucherDateDateValu;
          this.editdata.postingDate = postingDateDateValu;

          this.selectAgremetList(this.editdata.partyId);
          this.AmountDetials(this.editdata.agreementId);
          
          this.payment= data;
         
          if (this.editdata.paymentsDetails != null) {
            for (let i = 0; i < this.editdata.paymentsDetails.length; i++) {
              this.addDetailsItem();
            }
           
          }

          //From Valu Set
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
        this.paymentService.getAll().subscribe((data: Payment[])=>{
        this.payments=data;
      })
    }

      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }
      
      //Payment Add or Edit
      addOrUpdateDetails(){
      this.submitted = true;
      Object.assign(this.payment, this.productform.value);

              if(this.payment.id){
                console.log(this.payment)
                this.paymentService.update(this.payment.id, this.payment).subscribe(res => {
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Apply updated', life: 3000 });
                 
                })
              }
              else{

                this.paymentService.create(this.payment).subscribe(res => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agreement Added', life: 3000 })
                this.payment={}
                
                        this.productform=this.fb.group({
                          id: this.fb.control(0),
                          voucherNo: this.fb.control('', Validators.required),
                          partyId: this.fb.control(0,Validators.required),
                          postingDate: this.fb.control('',Validators.required),
                          voucherDate:this.fb.control('',Validators.required),
                          narration:this.fb.control(''),
                          agreementId:this.fb.control('',Validators.required),
                          totalAmount:this.fb.control({ value: 0, disabled: true }),
                          totalAmountType:this.fb.control('Credit'),
                          partyName:this.fb.control(''),
                          paymentsDetails: this.fb.array([],Validators.required)
                    
                    
                      })

                      this.amountDetials={}
                      this.singleAgreement= {}; 
                this.ngOnInit();
                this.amountDetials();
                })

                
              }
              this.payments = [...this.payments]
              
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
  amountType:this.fb.control('Credit')
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
      agreementId:this.fb.control('',[Validators.required]),
      totalAmount:this.fb.control(0),
      totalAmountType:this.fb.control('Credit'),
      partyName:this.fb.control(''),
      paymentsDetails: this.fb.array([],[Validators.required])


  })

 //get from  for validation Massege Show
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
  selectAgremetList(event:any){
    this.paymentService.agreementDropdown(event).subscribe(data =>{
      this.agreementList = data;

    })
    
    //this.payment.partyId
      this.paymentService.amountDetials(event).subscribe(data=>{
        this.amountDetials = data;
      })
  }


  // cascadin dropdown
  AmountDetials(event:any){
    console.log(event);
    this.paymentService.singleAmountDetials(event).subscribe(data=>{
      this.singleAgreement = data;
    })
   
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
