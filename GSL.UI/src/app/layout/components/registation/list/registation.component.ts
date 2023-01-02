import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { role } from 'src/app/layout/api/role';
import { AuthService } from 'src/app/layout/service/auth.service';
import { Registation } from 'src/app/layout/api/registation';
import { RegistetionService } from 'src/app/layout/service/registation.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    templateUrl: './registation.component.html',
    providers: [MessageService, ConfirmationService]
})
export class  RegistationComponent implements OnInit {
  form!: FormGroup;
  registations: Registation[] = [];
  registation: Registation = {
    };

    
    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];
    userRole:role[]=[];
    stafUserRole:role[]=[];

    statuses: any[] = [];
    
    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public registationService: RegistetionService,
      private authService:AuthService,
      private router:Router,
      private datePipe:DatePipe) { }

    ngOnInit(): void {
     
      this.getAllUser(this.registation);
      this.form = new FormGroup({
        firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.email]),
        mobile: new FormControl('',[Validators.required]),
        dob: new FormControl('',[Validators.required]),
        lastUniversity: new FormControl(''),
        assignStatus: new FormControl(''),
        address: new FormControl(''),
       


      });
    }

    getAllUser(user: Registation){
      this.registationService.getAll().subscribe((data: Registation[])=>{
      this.registations=data;
    })
  }

  get f(){
    return this.form.controls;
  }

SessionAdd:any;
  StudentDropSession(id:any){
    localStorage.setItem("sessionId", id);
    this.SessionAdd = localStorage.getItem("sessionId")
    this.router.navigateByUrl('/job-assign/addoredit')
    
  }

  deleteUser(user: Registation) {
      this.deleteUserDialog = true;
      this.registation = { ...user };
  }



    openNew() {
        
        
        this.submitted = false;
        this.userDialog = true;
        this.registation = {};
        
    }
    editUser(user: Registation) {
      this.registation = { ...user };
      let DOB = this.datePipe.transform(this.registation.dob, 'yyyy-MM-dd')

      this.registation.dob = DOB;
      this.userDialog = true;
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        
        this.registationService.delete(this.registation.id).subscribe(res => {
          this.registations = this.registations.filter(item => item.id !== this.registation.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  addOrUpdateUser(){
    this.submitted = true;
    

      if(this.registation.id){
        console.log(this.registation)
        this.registationService.update(this.registation.id, this.registation).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          this.getAllUser(this.registation);
        })
      }
      else{
        this.registationService.create(this.registation).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
          this.getAllUser(this.registation);
        })
      }
    this.registations = [...this.registations]
    this.userDialog = false;
    this.product = {};

    }

          
  
}

