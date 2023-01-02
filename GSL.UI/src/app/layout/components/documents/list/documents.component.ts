import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

import { Documents } from 'src/app/layout/api/documents';
import { DocumentsService } from 'src/app/layout/service/documents.service';

@Component({
    templateUrl: './Documents.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DocumentsComponent implements OnInit {

  //Personal Information
 
  documents: Documents[] = [];
  document: Documents = {};

  

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private documentService:DocumentsService,
      public datePipe:DatePipe,
      ) { }

    ngOnInit(): void {
      //Personal Information
      this.getAllDocument(this.document);

    }
    getAllDocument(data: Documents){
      this.documentService.getAllDetials().subscribe((data: Documents[])=>{
      this.documents=data; 
     
    })



}
}
