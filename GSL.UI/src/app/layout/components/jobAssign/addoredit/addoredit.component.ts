import { DatePipe } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { interval } from 'rxjs';
import { Country } from 'src/app/layout/api/countrie';
import { dropDownVM } from 'src/app/layout/api/dropDownVM';
import { assignJobDetails, JobAssign } from 'src/app/layout/api/jobassign';
import { Registation } from 'src/app/layout/api/registation';
import { VisitorDropdown } from 'src/app/layout/api/visitorDropdown';

import { CountryService } from 'src/app/layout/service/country.service';
import { JobAssignService } from 'src/app/layout/service/jobassign.service';
import { RegistetionService } from 'src/app/layout/service/registation.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {
  formvariant! : FormArray<any>
      jobAssigns: JobAssign[] = [];
      
      todayDate:any= new Date();
      TodayDate =this.datePipe.transform(this.todayDate,'yyyy-MM-dd');
      jobAssign: JobAssign = {
        
        issueDate: this.TodayDate
      };

      

     
      editdata:any; 

      id!:number;
      dateDisable:boolean=true
      //auto select
      visitorname:any;
      //dropdown
      country:Country[]=[]
      countries: any[] = [];
      studenregistation:any;
      allVisitors:Registation[]=[]
      allVisitor:VisitorDropdown={}
      valu:any;
      filteredCountries: any[] = [];
      studentSubject:any;
      staffNames:any;
      studentNames:any;
      counciorNames:any;
      counciorName:{}={}
  
     
      submitted: boolean = false;
  
      cols: any[] = [];
      statuses: any[] = [];
      
  
      rowsPerPageOptions = [5, 10, 20];
      product!: {};
      
      constructor(
        private messageService: MessageService, 
        private countryService: CountryService,
        private registerService:RegistetionService,
        private jobAssignService:JobAssignService,
        private datePipe:DatePipe,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        public subjectService: SubjectService,
        public userService:UserService,
        public router:Router
        ) { }
  
      ngOnInit(): void {
       
        this.getAllJobAssign(this.jobAssign);
        this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });

      

      this.subjectService.getAll().subscribe(data=>{
        this.studentSubject=data;
      })

      //Drop down List
      this.userService.dropdownStaf().subscribe(data=>{
        this.staffNames = data;
      })
      this.userService.dropdownCouncilor().subscribe(data=>{
        this.counciorNames = data;
      })

      this.registerService.dropdownVisitor().subscribe((data: any)=>{
        this.allVisitors = data;
        this.allVisitor = data;
        
        
      })
      
      //route selected
      
      
      this.id= this.route.snapshot.params['jobAssignId'];
    
     
      if(this.id != undefined){
       
          
        
        //applyDetials table valu set
        this.jobAssignService.find(this.id).subscribe((data: any)=>{


          
          
          
          let issuDateValu = this.datePipe.transform(data.issueDate,'yyyy-MM-dd');
        
          
          this.editdata = data;
          this.editdata.issueDate = issuDateValu;

          if (this.editdata.assignJobDetails != null) { 
            for (let i = 0; i < this.editdata.assignJobDetails.length; i++) {
              
              let extendedDatevalu = this.datePipe.transform(this.editdata.assignJobDetails[i].nextFollowupDate,'yyyy-MM-dd')
              this.editdata.assignJobDetails[i].nextFollowupDate=extendedDatevalu;

              this.addDetailsItem();
            }
           
          }

          this.productform.setValue({
            id: this.editdata.id,
            
            issueDate: this.editdata.issueDate,
            assignToId: this.editdata.assignToId,
            assignJobDetails:this.editdata.assignJobDetails

          })

          
        });
        
      }else{
       
        this.addDetailsItem();
        
      }

      }
      getAllJobAssign(jobassign: JobAssign){
        this.jobAssignService.getAll().subscribe((data: JobAssign[])=>{
        this.jobAssigns=data;
      })
    }

      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }
 
      addOrUpdateDetails(){
        
      this.submitted = true;
      
     

        Object.assign(this.jobAssign, this.productform.value);

              if(this.jobAssign.id){
                
                this.jobAssignService.update(this.jobAssign.id, this.jobAssign).subscribe(res => {
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Assign updated', life: 3000 });
                 
                })
              }
              else{
                
                this.jobAssignService.create(this.jobAssign).subscribe({
                  next:(res)=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
                  },
                  error:(error)=>{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Already Added', life: 3000 });


                  }
                  
                }
                  
                  )
                  
                  
                
              }
            this.jobAssigns = [...this.jobAssigns]
            
         
        
    }


    

  //  Detials Table
  

get assignJobDetails(){
  return this.productform.controls['assignJobDetails'] as FormArray;
  
}

addDetailsItem():void{
 this.formvariant = this.productform.get("assignJobDetails") as FormArray;
this.formvariant.push(this.GenerateRow());
}
removeAtDetails(index:number):void{
  return this.assignJobDetails.removeAt(index)
}

GenerateRow() {
return this.fb.group({
  id:this.fb.control(0),
  assignJobMasterId:this.fb.control(0,[Validators.required]),
  councilorId:this.fb.control('', [Validators.required]),
  visitorId: this.fb.control(localStorage.getItem("sessionId") ,[Validators.required]),
  jobAssignToId: this.fb.control(0),
  nextFollowupDate: this.fb.control(this.TodayDate),
  preferenceCountry: this.fb.control(''),
  councilorRemarks: this.fb.control(''),
  status:this.fb.control(''),
  stafName: this.fb.control(''),
  councilorName: this.fb.control(''),
  userName: this.fb.control(''),
  issueDate:this.fb.control(new Date()),
  agreementIssueStatus:this.fb.control(''),
  userId:this.fb.control(0),
  councilorStatus:this.fb.control('')
});
}



//product form
  productform=this.fb.group({
      id: this.fb.control(0),
      
      issueDate: this.fb.control(''),
      assignToId: this.fb.control(0,[Validators.required]),
      //ticketNo:this.fb.control('',[Validators.required]),
      assignJobDetails: this.fb.array([])

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
