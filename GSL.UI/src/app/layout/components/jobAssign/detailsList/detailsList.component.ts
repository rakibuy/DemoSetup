import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { JobAssignService } from 'src/app/layout/service/jobassign.service';
import { UserService } from 'src/app/layout/service/user.service';
import { User } from 'src/app/layout/api/user';
import { assignJobDetails } from 'src/app/layout/api/jobassign';
import { ActivatedRoute } from '@angular/router';



@Component({
    templateUrl: './detailsList.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DetailsListComponent implements OnInit {

  //Personal Information
 
  assignJobDetails: assignJobDetails[] = [];
  assignJobDetail: assignJobDetails = {
    
  };

  

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    assignToId:number=0;

    //get all Staf
    stafs:User[]= []
    staf:User={}
    
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private jobAssignService:JobAssignService,
      private userService:UserService,
      public datePipe:DatePipe,
      public activateRoute:ActivatedRoute
      ) { }

    ngOnInit(): void {

     
      this.assignToId= this.activateRoute.snapshot.params['assignToId'];

      

      if(this.assignToId != undefined){
        
         
       this.jobAssignService.getAllDetialById(this.assignToId).subscribe((data:any)=>{
        this.assignJobDetails=data;
      })

      }
      

    }

  

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
