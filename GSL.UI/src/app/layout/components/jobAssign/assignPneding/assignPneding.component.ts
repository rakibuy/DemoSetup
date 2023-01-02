import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/layout/service/user.service';
import { User } from 'src/app/layout/api/user';
import { RegistetionService } from 'src/app/layout/service/registation.service';
import { Registation } from 'src/app/layout/api/registation';



@Component({
    templateUrl: './assignPneding.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AssignPnedingComponent implements OnInit {
  //users
  users:User[]=[]
  user:User={}
  registations:Registation[]=[]

//common
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private userService:UserService,
      public datePipe:DatePipe,
      private registationService:RegistetionService
      ) { }

    ngOnInit(): void {

       //get all Staf
       this.userService.GetAllJobUnAssignStudet().subscribe((data:any)=>{
        this.users=data;
        
      })
      this.registationService.getUnAssignVisitor().subscribe((data:any)=>{
        this.registations = data;
      })

    }

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
