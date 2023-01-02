import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Session } from 'src/app/layout/api/session';
import { SessionService } from 'src/app/layout/service/session.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PassportDetail } from 'src/app/layout/api/passportDetail';
import { PassportDetailService } from 'src/app/layout/service/passportDetail.service';

@Component({
    templateUrl: './passportDetails.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PassportDetailsComponent implements OnInit {
  form!: FormGroup;
  passports: PassportDetail[] = [];
  passport: PassportDetail = {
    id: 0,
    companyId: '',
    branchId: '',
    registrationId: '',
    passportNumber: '',
    placeOfIssue: '',
    issueDate: new Date(),
    expireDate: new Date(),
    remarks: '',
    };
    passportDialog: boolean = false;

    deletePassportDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      public passportService: PassportDetailService) { }

    ngOnInit(): void {
      this.getAllPassport(this.passport);
      this.form = new FormGroup({
        name: new FormControl(''),
        duration: new FormControl('')


      });
    }

    getAllPassport(passport: PassportDetail){
      this.passportService.getAll().subscribe((data: PassportDetail[])=>{
      this.passports=data;
    })
  }


  deletePassport(passport: PassportDetail) {
      this.deletePassportDialog = true;
      this.passport = { ...passport };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.passportDialog = true;
        this.passport = {
          id: 0,
          companyId: '',
          branchId: '',
          registrationId: '',
          passportNumber: '',
          placeOfIssue: '',
          issueDate: new Date(),
          expireDate: new Date(),
          remarks: '',
          };
    }
    editPassport(passport: PassportDetail) {
      this.passport = { ...passport };
      this.passportDialog = true;
    }

    confirmDelete() {
        this.deletePassportDialog = false;
        this.passportService.delete(this.passport.id).subscribe(res => {
          this.passports = this.passports.filter(item => item.id !== this.passport.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.passportDialog = false;
      this.submitted = false;
  }

  addOrUpdatePassport(){
    this.submitted = true;

          if(this.passport.id){
            this.passportService.update(this.passport.id, this.passport).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport updated', life: 3000 });
              this.getAllPassport(this.passport);
            })
          }
          else{
            this.passportService.create(this.passport).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Added', life: 3000 });
              this.getAllPassport(this.passport);
            })
          }
        this.passports = [...this.passports]
        this.passportDialog = false;
        this.product = {};
  }
}

