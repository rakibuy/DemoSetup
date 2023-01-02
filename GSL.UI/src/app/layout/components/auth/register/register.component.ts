import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Register } from 'src/app/layout/api/register';
import { role } from 'src/app/layout/api/role';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/layout/service/auth.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
	templateUrl: './register.component.html',
	providers: [MessageService, ConfirmationService]
})
export class RegisterComponent implements OnInit{

	confirmed: boolean = false;

	
	constructor(
		private messageService: MessageService, 
		private confirmationService: ConfirmationService,
		public userService: UserService,
		private authService:AuthService,
		private layoutService: LayoutService,
    private router:Router) { }

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}



	form!: FormGroup;
  	users: Register[] = [];
  	user: Register = {
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

    

    ngOnInit(): void {
      this.form = new FormGroup({
        userName: new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.email]),
        number: new FormControl('',[Validators.required]),
        role: new FormControl(10),
        password: new FormControl('',[Validators.required]),
        cpassword: new FormControl('',[Validators.required]),
       
      });
    }

   
  

  get f(){
    return this.form.controls;
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

      console.log(this.form.value)
      
        this.userService.create(this.form.value).subscribe(res => {

          this.router.navigateByUrl("auth/login")
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
          
        })
      
    this.users = [...this.users]
    this.userDialog = false;
    this.product = {};

    }else{
      this.repeatPass='inline';
    }

          
  }


	

}
