import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { assignJobDetails, JobAssign } from 'src/app/layout/api/jobassign';
import { JobAssignService } from 'src/app/layout/service/jobassign.service';
import { UserService } from 'src/app/layout/service/user.service';
import { User } from 'src/app/layout/api/user';
import { Router } from '@angular/router';



@Component({
    templateUrl: './jobAssign.component.html',
    providers: [MessageService, ConfirmationService]
})
export class JobAssignComponent implements OnInit {

  //Personal Information
 
  jobAssigns: JobAssign[] = [];
  jobAssign: JobAssign = {};

  
  assignJobDetails: assignJobDetails[] = [];
  assignJobDetail: assignJobDetails = {
        
  };


  

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    //get all Staf
    stafs:User[]= []
    staf:User={}
    
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private jobAssignService:JobAssignService,
      private router:Router,
      private userService:UserService,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {

     
      //Personal Information
      this.getAllJobAssign(this.jobAssign);
     
      

       //get all Staf
       this.userService.getAllStaf().subscribe((data:any)=>{
        this.stafs=data;
        
      })


      this.jobAssignService.getAllDetials().subscribe((data:any)=>{
        this.assignJobDetails=data;
        
      })

      

    }

    getAllJobAssign(jobAssign: JobAssign){
      this.jobAssignService.getAll().subscribe((data: JobAssign[])=>{
      this.jobAssigns=data; 
      
     
    })
}


addoreditPage(){
  localStorage.removeItem("sessionId")
  this.router.navigateByUrl("/job-assign/addoredit")
}



respons:any;
addUserDialog:boolean=false;
JobDetialsId:number=0;

AddUserDialog(id:number){
  
  this.addUserDialog=true;
  this.JobDetialsId=id;
  
}

AddStudent(){
  this.userService.CreateStudent(this.JobDetialsId).subscribe((data:any)=>{
    this.respons = data;
    console.log(this.JobDetialsId)
    if(this.respons.code == 1000){
      
      this.messageService.add({ severity: 'success', summary: 'Successful Add', detail: 'Allrady User', life: 3000 });
      this.ngOnInit();
    }else{
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
      this.ngOnInit();
    }
    
  })
  this.addUserDialog=false;
}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
