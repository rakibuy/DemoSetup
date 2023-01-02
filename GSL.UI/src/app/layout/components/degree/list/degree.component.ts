import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Degree } from 'src/app/layout/api/degree';
import { DegreeService } from 'src/app/layout/service/degree.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './degree.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DegreeComponent implements OnInit {
  form!: FormGroup;
  degrees: Degree[] = [];
  degree: Degree = {
    };
    degreeDialog: boolean = false;

    deleteDegreeDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      public degreeService: DegreeService) { }

    ngOnInit(): void {
      this.getAllDegree(this.degree);
     
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        duration: new FormControl('',[Validators.required])


      });
    }

  getAllDegree(degree: Degree){
      this.degreeService.getAll().subscribe((data: Degree[])=>{
      this.degrees=data;
    })
  }
  get f(){
    return this.form.controls;
  }
  deleteDegree(degree: Degree) {
      this.deleteDegreeDialog = true;
      this.degree = { ...degree };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.degreeDialog = true;
        this.degree={
        }
    }
    editDegree(degree: Degree) {
      this.degree = { ...degree }; 
      this.degreeDialog = true;
    }
  

    confirmDelete() {
        this.deleteDegreeDialog = false;
        this.degreeService.delete(this.degree.id).subscribe(res => {
          this.degrees = this.degrees.filter(item => item.id !== this.degree.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Degree Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.degreeDialog = false;
      this.submitted = false;
  }

  addOrUpdateDegree(){
    this.submitted = true;

          if(this.degree.id){
            this.degreeService.update(this.degree.id, this.degree).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Degree updated', life: 3000 });
              this.getAllDegree(this.degree);
            })
          }
          else{ 
           
            this.degreeService.create(this.degree).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Degree Added', life: 3000 });
              this.getAllDegree(this.degree);
            })
          }
        this.degrees = [...this.degrees]
        this.degreeDialog = false;
        
  }
  
}

