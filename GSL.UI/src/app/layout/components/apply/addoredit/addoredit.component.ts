import { DatePipe } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { delay, findIndex, interval, timeInterval, timeout, timer, timestamp } from 'rxjs';
import { ApplyDetails, ApplyMaster } from 'src/app/layout/api/apply';
import { Country } from 'src/app/layout/api/countrie';
import { Status } from 'src/app/layout/api/Status';
import { ApplyService } from 'src/app/layout/service/apply.service';
import { CountryService } from 'src/app/layout/service/country.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {
  formvariant! : FormArray<any>
      applys: ApplyMaster[] = [];
      apply: ApplyMaster = {
        status:"Pending"
      };
      applydetailsdata:ApplyDetails = {}
      editdata:any;
      id!:string;

      //dropdown
      country:Country[]=[]
      countries: any[] = [];
      studenregistation:any;
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
        private applyService:ApplyService,
        private datePipe:DatePipe,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        public subjectService: SubjectService,
        public userService:UserService,
        public router:Router
        ) { }
  
      ngOnInit(): void {
        this.getAllApply(this.apply);
        this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });

      this.registerService.getAll().subscribe(data => {
        this.studenregistation=data;
      })

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

      //route selected
      
      this.id= this.route.snapshot.params['applyId'];
     
      if(this.id != undefined){
       
          
        
        //applyDetials table valu set
        this.applyService.find(this.id).subscribe((data: any)=>{
          let applyDateValu =this.datePipe.transform(data.applyDate,'yyyy-MM-dd');
          let issuDateValu =this.datePipe.transform(data.issueDate,'yyyy-MM-dd');
        
          this.editdata = data;
          this.editdata.applyDate=applyDateValu;
          this.editdata.issueDate = issuDateValu;
          
   
          if (this.editdata.applyDetails != null) {
            for (let i = 0; i < this.editdata.applyDetails.length; i++) {

              let flowUpDateValu = this.datePipe.transform(this.editdata.applyDetails[i].followUpDate,'yyyy-MM-dd')


              this.editdata.applyDetails[i].followUpDate = flowUpDateValu;
              this.addDetailsItem();
            }
           
          }

          this.productform.setValue({
            id: this.editdata.id,
            issueDate: this.editdata.issueDate,
            applyDate: this.editdata.applyDate,
            registrationId: this.editdata.registrationId,
            staffId:this.editdata.staffId,
            status:this.editdata.status,
            applyDetails:this.editdata.applyDetails
          })

          
        });
        
      }else{
       
        this.addDetailsItem();
        
      }

      }
      getAllApply(applymaster: ApplyMaster){
        this.applyService.getAll().subscribe((data: ApplyMaster[])=>{
        this.applys=data;
      })
    }

      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }
      

      addOrUpdateDetails(){
      this.submitted = true;
      
      
      Object.assign(this.apply, this.productform.value);

              if(this.apply.id){
                this.applyService.update(this.apply.id, this.apply).subscribe(res => {
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Apply updated', life: 3000 });
                  
                })
              }
              else{

                this.applyService.create(this.apply).subscribe(res => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agreement Added', life: 3000 })

                })

                //this.router.navigate(['apply/list']);
              }
              this.applys = [...this.applys]
              //this.apply={};
            
            

    }

  //  Detials Table
  

get applyDetails(){
  return this.productform.controls['applyDetails'] as FormArray;
  
}

addDetailsItem():void{
 this.formvariant = this.productform.get("applyDetails") as FormArray;
this.formvariant.push(this.GenerateRow());
}
removeAtDetails(index:number):void{
  return this.applyDetails.removeAt(index)
}

GenerateRow() {
return this.fb.group({
  id:this.fb.control(''),
  applyMasterId:this.fb.control(''),
  countryId: this.fb.control('',[Validators.required]),
  subjectId: this.fb.control('',[Validators.required]),
  followUpDate: this.fb.control('',[Validators.required]),

});
}



//product form
  productform=this.fb.group({
      id: this.fb.control(''),
      issueDate: this.fb.control('',[Validators.required]),
      applyDate: this.fb.control('',[Validators.required]),
      registrationId: this.fb.control('',[Validators.required]),
      staffId:this.fb.control(''),
      status:this.fb.control(''),
      applyDetails: this.fb.array([])


  })
 //get from   
 get f(){
  return this.productform.controls;
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
