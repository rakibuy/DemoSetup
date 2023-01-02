import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { University } from 'src/app/layout/api/university';
import { UniversityService } from 'src/app/layout/service/university.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/layout/service/country.service';
import { AdminGuard } from 'src/app/layout/Guard/admin.guard';
import { AdminStafStudentGuard } from 'src/app/layout/Guard/adminStafStudent.guard';
import { AuthService } from 'src/app/layout/service/auth.service';
import { flush } from '@angular/core/testing';
import { Lead } from 'src/app/layout/api/lead';
import { LeadService } from 'src/app/layout/service/lead.service';

@Component({
    templateUrl: './lead.component.html',
    providers: [MessageService, ConfirmationService]
})
export class LeadComponent implements OnInit {
  form!: FormGroup;
    leads: Lead[] = [];
    lead: Lead = {
    };
    universityDialog: boolean = false;

    deleteUniversityDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};
    countries:any;
    manuActive:any=false;
    

    constructor(private messageService: MessageService,
       private confirmationService: ConfirmationService,
      public leadService: LeadService,
      public countryService:CountryService,
      public authService:AuthService
      ) { }

    ngOnInit(): void {
      this.getAllUniversity(this.lead);
      this.form = new FormGroup({
        cname: new FormControl('',[Validators.required, Validators.minLength(3)]),
        cnumber: new FormControl('',[Validators.required]),
        cemail: new FormControl('',[Validators.required]),
        caddress: new FormControl(''),
        coccupation: new FormControl(''),
        cdesignation: new FormControl(''),
        
        


      });
      
     
    }

    getAllUniversity(university: University){
      this.leadService.getAll().subscribe((data: University[])=>{
      this.leads=data;
    })
  }

 

  get f(){
    return this.form.controls;
  }

  




    openNew() {
        this.product = {};
        this.submitted = false;
        this.universityDialog = true;
        this.lead = {
        };
    }
    editUiversity(university: University) {
      this.lead = { ...university };
      this.universityDialog = true;
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

          if(this.lead.id){
            this.leadService.update(this.lead.id, this.lead).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University updated', life: 3000 });
              this.getAllUniversity(this.lead);
            })
          }
          else{
            this.leadService.create(this.lead).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University Added', life: 3000 });
              this.getAllUniversity(this.lead);
              
            })
          }
        this.leads = [...this.leads]
        this.universityDialog = false;
        this.product = {};
  }
}

