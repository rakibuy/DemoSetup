import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/layout/service/user.service';
import { User } from 'src/app/layout/api/user';
import { Registation } from 'src/app/layout/api/registation';
import { RegistetionService } from 'src/app/layout/service/registation.service';



@Component({
    templateUrl: './assignDone.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AssignDoneComponent implements OnInit {
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
      private registationService:RegistetionService,
      

      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {

       //get all Staf
      //  this.userService.GetAllJobAssignStudet().subscribe((data:any)=>{
      //   this.users=data;
      //   console.log(this.users)
      // })

      this.registationService.getAssignVisitor().subscribe((data:any)=>{
        this.registations = data;
      })

    }

    unAssignThisJob(id:any){
    this.userService.unAssignThisJob(id).subscribe(date=>{
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'save', life: 3000 });
      this.ngOnInit()
    })
    }

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
