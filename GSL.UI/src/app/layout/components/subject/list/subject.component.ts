import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'src/app/layout/api/subject';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { findIndex } from 'rxjs';


@Component({
    templateUrl: './subject.component.html',
    providers: [MessageService, ConfirmationService]
})
export class SubjectComponent implements OnInit {
  form!: FormGroup;
  subjects: Subject[] = [];
   
  subject: Subject = {
    };
    subjectDialog: boolean = false;

    deleteSubjectDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
      public subjectService: SubjectService) { }

    ngOnInit(): void {
      this.getAllSubject(this.subject);
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        code: new FormControl('',[Validators.required])


      });
    }

    getAllSubject(subject: Subject){
      this.subjectService.getAll().subscribe((data: Subject[])=>{
      this.subjects=data;
    })
  }
get f(){
  return this.form.controls;
}

  deleteSubject(subject: Subject) {
      this.deleteSubjectDialog = true;
      this.subject = { ...subject };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.subjectDialog = true;
        this.subject = {
        };
    }
    editUiversity(subject: Subject) {
      this.subject = { ...subject };
      this.subjectDialog = true;
    }

    confirmDelete() {
        this.deleteSubjectDialog = false;
        this.subjectService.delete(this.subject.id).subscribe(res => {
          this.subjects = this.subjects.filter(item => item.id !== this.subject.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.subjectDialog = false;
      this.submitted = false;
  }

  addOrUpdateSubject(){
    this.submitted = true;

          if(this.subject.id){
            this.subjectService.update(this.subject.id, this.subject).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject updated', life: 3000 });
              this.getAllSubject(this.subject);
            })
          }
          else{
            this.subjectService.create(this.subject).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subject Added', life: 3000 });
              this.getAllSubject(this.subject);
            })
          }
        this.subjects = [...this.subjects]
        this.subjectDialog = false;
        this.product = {};
  }
}

