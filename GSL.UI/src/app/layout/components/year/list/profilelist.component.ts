import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Year } from 'src/app/layout/api/year';
import { YearService } from 'src/app/layout/service/year.service';

@Component({
    templateUrl: './profilelist.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ProfileListComponent implements OnInit {
  form!: FormGroup;
  years: Year[] = [];
  year: Year = {
    };
    yearDialog: boolean = false;

    deleteYearDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public yearService: YearService) { }

    ngOnInit(): void {
      this.getAllYear(this.year);
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)])
        


      });
    }

    getAllYear(year: Year){
      this.yearService.getAll().subscribe((data: Year[])=>{
      this.years=data;
    })
  }

  get f(){
    return this.form.controls;
  }


  deleteYear(year: Year) {
      this.deleteYearDialog = true;
      this.year = { ...year };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.yearDialog = true;
        this.year={};
    }
    editYear(year: Year) {
      this.year = { ...year };
      this.yearDialog = true;
    }

    confirmDelete() {
        this.deleteYearDialog = false;
        
        this.yearService.delete(this.year.id).subscribe(res => {
          this.years = this.years.filter(item => item.id !== this.year.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Year Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    hideDialog() {
      this.yearDialog = false;
      this.submitted = false;
  }

  addOrUpdateYear(){
    this.submitted = true;

          if(this.year.id){
            this.yearService.update(this.year.id, this.year).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Year updated', life: 3000 });
              this.getAllYear(this.year);
            })
          }
          else{
            this.yearService.create(this.year).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Year Added', life: 3000 });
              this.getAllYear(this.year);
            })
          }
        this.years = [...this.years]
        this.yearDialog = false;
        this.product = {};
  }
}

