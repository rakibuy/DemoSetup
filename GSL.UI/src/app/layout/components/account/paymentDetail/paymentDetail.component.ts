import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Session } from 'src/app/layout/api/session';
import { SessionService } from 'src/app/layout/service/session.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './paymentDetail.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PaymentDetailComponent implements OnInit {
  form!: FormGroup;
    universities: Session[] = [];
    university: Session = {
      id: 0,
      name: '',
      duration:''
      
      
      // AddedDate: 0,
      // AddedFromIP: '',
      // UpdatedBy: 0,
      // UpdatedDate: 0,
      // UpdatedFromIP: 0
    };
    universityDialog: boolean = false;

    deleteUniversityDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
      public universityService: SessionService) { }

    ngOnInit(): void {
      this.getAllUniversity(this.university);
      this.form = new FormGroup({
        name: new FormControl(''),
        duration: new FormControl('')


      });
    }

    getAllUniversity(university: Session){
      this.universityService.getAll().subscribe((data: Session[])=>{
      this.universities=data;
      console.log(data);
    })
  }


  deleteUniversity(university: Session) {
      this.deleteUniversityDialog = true;
      this.university = { ...university };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.universityDialog = true;
    }
    editUiversity(university: Session) {
      console.log(this.university.id);
      this.universityService.find(this.university.id).subscribe(res => {
        this.universities = this.universities.filter(item => item.id !== this.university.id);
      })

      this.university = { ...university };
      this.universityDialog = true;
    }

    confirmDelete() {
        this.deleteUniversityDialog = false;
        console.log(this.university.id);
        this.universityService.delete(this.university.id).subscribe(res => {
          this.universities = this.universities.filter(item => item.id !== this.university.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unviersity Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.universityDialog = false;
      this.submitted = false;
  }

  addOrUpdateUniversity(){
    this.submitted = true;

          if(this.university.id){
            //this.universities.push(this.university);
            this.universityService.update(this.university.id, this.university).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University updated', life: 3000 });
              this.getAllUniversity(this.university);
            })
          }
          else{
            //this.universities.push(this.university);
            this.universityService.create(this.university).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University Added', life: 3000 });
              this.getAllUniversity(this.university);
            })
          }
        this.universities = [...this.universities]
        this.universityDialog = false;
        this.product = {};
  }
}

