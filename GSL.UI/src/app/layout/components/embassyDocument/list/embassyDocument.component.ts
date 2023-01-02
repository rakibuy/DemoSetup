import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Session } from 'src/app/layout/api/session';
import { SessionService } from 'src/app/layout/service/session.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EmbassyDocument } from 'src/app/layout/api/embassyDocument';
import { EmbassyDocumentService } from 'src/app/layout/service/embassyDocument.service';

@Component({
    templateUrl: './embassyDocument.component.html',
    providers: [MessageService, ConfirmationService]
})
export class EmbassyDocumentComponent implements OnInit {
  form!: FormGroup;
  embassys: EmbassyDocument[] = [];
  embassy: EmbassyDocument = {
      id: 0,
      companyId: '',
      branchId: '',
      registrationId: '',
      documentTypeId: '',
      documentTypeName: '',
      remarks: '',
    };
    embassyDialog: boolean = false;

    deleteEmbassyDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
      public embassyService: EmbassyDocumentService) { }

    ngOnInit(): void {
      this.getAllEmbassy(this.embassy);
      this.form = new FormGroup({
        name: new FormControl(''),
        duration: new FormControl('')


      });
    }

    getAllEmbassy(embassy: EmbassyDocument){
      this.embassyService.getAll().subscribe((data: EmbassyDocument[])=>{
      this.embassys=data;
    })
  }


  deleteEmbassy(embassy: EmbassyDocument) {
      this.deleteEmbassyDialog = true;
      this.embassy = { ...embassy };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.embassyDialog = true;
        this.embassy = {
          id: 0,
          companyId: '',
          branchId: '',
          registrationId: '',
          documentTypeId: '',
          documentTypeName: '',
          remarks: '',
        };
    }
    editEmbassy(embassy: EmbassyDocument) {
     
      this.embassy = { ...embassy };
      this.embassyDialog = true;
    }

    confirmDelete() {
        this.deleteEmbassyDialog = false;
        this.embassyService.delete(this.embassy.id).subscribe(res => {
          this.embassys = this.embassys.filter(item => item.id !== this.embassy.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Embassy Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.embassyDialog = false;
      this.submitted = false;
  }

  addOrUpdateEmbassy(){
    this.submitted = true;

          if(this.embassy.id){
            this.embassyService.update(this.embassy.id, this.embassy).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Embassy Document updated', life: 3000 });
              this.getAllEmbassy(this.embassy);
            })
          }
          else{
            this.embassyService.create(this.embassy).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University Added', life: 3000 });
              this.getAllEmbassy(this.embassy);
            })
          }
        this.embassys = [...this.embassys]
        this.embassyDialog = false;
        this.product = {};
  }
}

