import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/layout/api/user';
import { UserService } from 'src/app/layout/service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { role } from 'src/app/layout/api/role';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService, ConfirmationService]
})
export class  UserComponent implements OnInit {
  form!: FormGroup;
  users: User[] = [];
  user: User = {
    };

    showItemByRole:string=""

    repeatPass:string="none";
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
      public userService: UserService,
      private authService:AuthService) { }

    ngOnInit(): void {
      this.showItemByRole = this.authService.HaveAccess();
      this.userRole = [
        {name: 'Visitor', code: 0},
        {name: 'Staf', code: 1},
        {name: 'Account', code: 2},
        {name: 'Councilor', code: 3},
        {name: 'Student', code: 10},
        {name: 'Admin', code: 100}
    ];

    this.stafUserRole = [
      {name: 'Visitor', code: 10}
  ];
      this.getAllUser(this.user);
      this.form = new FormGroup({
        fullName: new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.email]),
        contactNo: new FormControl('',[Validators.required]),
        role: new FormControl(0),
        password: new FormControl('',[Validators.required]),
        cpassword: new FormControl('',[Validators.required]),
       
      });
    }

    getAllUser(user: User){
      this.userService.getAll().subscribe((data: User[])=>{
      this.users=data;
    })
  }

  get f(){
    return this.form.controls;
  }


  deleteUser(user: User) {
      this.deleteUserDialog = true;
      this.user = { ...user };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.userDialog = true;
        this.user = {
        };
    }
    editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        
        this.userService.delete(this.user.id).subscribe(res => {
          this.users = this.users.filter(item => item.id !== this.user.id);
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
    if(this.f['password'].value==this.f['cpassword'].value){

      if(this.user.id){
        console.log(this.user)
        this.userService.updatePassChange(this.user.id, this.user).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User updated', life: 3000 });
          this.getAllUser(this.user);
        })
      }
      else{
        this.userService.create(this.user).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
          this.getAllUser(this.user);
        })
      }
    this.users = [...this.users]
    this.userDialog = false;
    this.product = {};

    }else{
      this.repeatPass='inline';
    }

          
  }
}

