import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ApplyMaster } from 'src/app/layout/api/apply';
import { ApplyService } from 'src/app/layout/service/apply.service';

@Component({
    templateUrl: './apply.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ApplyComponent implements OnInit {

  //Personal Information
 
  applys: ApplyMaster[] = [];
  apply: ApplyMaster = {};

  

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private applyService:ApplyService,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {
      //Personal Information
      this.getAllApply(this.apply);

    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
    getAllApply(applyMaster: ApplyMaster){
      this.applyService.getAll().subscribe((data: ApplyMaster[])=>{
      this.applys=data; 
     
    })
}
}
