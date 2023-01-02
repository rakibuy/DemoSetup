import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/layout/api/user';
import { UserService } from 'src/app/layout/service/user.service';


@Component({
    templateUrl: './StudentPortal.component.html',
    providers: [MessageService, ConfirmationService]
})
export class StudentPortalComponent implements OnInit {

 
  //users
  users:User[]=[]
  user:User={}


 //common
 product!: {};
 submitted: boolean = false;
 cols: any[] = [];
 statuses: any[] = [];
 rowsPerPageOptions = [5, 10, 20];

  
  


    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private userService:UserService,
      private router:Router

      ) { }

    ngOnInit(): void {
      this.getAllUser(this.user);
    }

    
    getAllUser(user: User){
      this.userService.getAllStudent().subscribe((data: User[])=>{
      this.users=data;
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

    

}

