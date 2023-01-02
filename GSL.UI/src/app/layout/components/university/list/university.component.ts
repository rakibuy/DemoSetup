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

@Component({
    templateUrl: './university.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UniversityComponent implements OnInit {
  form!: FormGroup;
    universities: University[] = [];
    university: University = {
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
      public universityService: UniversityService,
      public countryService:CountryService,
      public authService:AuthService
      ) { }

    ngOnInit(): void {
      this.getAllUniversity(this.university);
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        description: new FormControl(''),
        countryId: new FormControl('',[Validators.required]),


      });
      console.log(this.manuActive)
      this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });
    }

    getAllUniversity(university: University){
      this.universityService.getAll().subscribe((data: University[])=>{
      this.universities=data;
    })
  }

  manuActived(){
    if(this.authService.HaveAccess()=="Admin"){
      return true
    }else{
      return false
    }
  }

  get f(){
    return this.form.controls;
  }

  deleteUniversity(university: University) {
      this.deleteUniversityDialog = true;
      this.university = { ...university };
  }




    openNew() {
        this.product = {};
        this.submitted = false;
        this.universityDialog = true;
        this.university = {
        };
    }
    editUiversity(university: University) {
      this.university = { ...university };
      this.universityDialog = true;
    }

    confirmDelete() {
        this.deleteUniversityDialog = false;
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
    console.log(this.university)
    this.submitted = true;

          if(this.university.id){
            this.universityService.update(this.university.id, this.university).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'University updated', life: 3000 });
              this.getAllUniversity(this.university);
            })
          }
          else{
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

