import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Login } from 'src/app/layout/api/login';
import { User } from 'src/app/layout/api/user';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/layout/service/auth.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
	templateUrl: './login.component.html',
	providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit{
	// user:string="admin";
	// psw:string="admin";
	users: User[] = [];
	user: User={}
  	
	noMatch: string = "d-none";
	rememberMe: boolean = false;

	constructor(private layoutService: LayoutService,
		private router: Router,
		private messageService: MessageService,
      	public userService: UserService,
		public authService:AuthService) {}

	get dark(): boolean { 
		return this.layoutService.config.colorScheme !== 'light';
	}
	
	
	data!:Login;
	
	

	ngOnInit(): void {
		
		
	

	  }

			loginForm = new FormGroup({
				//id:new FormControl(0),
		  email: new FormControl('',[Validators.required,Validators.email]),
		  password: new FormControl('',[Validators.required]),
				//fullName:new FormControl(''),
				//contactNo:new FormControl(''),
				//nid:new FormControl(''),

		});
		get f(){
			return this.loginForm.controls;
				}
	
				get Email(){
			return this.loginForm.get("email") as FormControl;
				}
				get Password(){
			return this.loginForm.get("password") as FormControl;
				}
				classdata(){
					this.noMatch="d-block";
				}
				
			
		loginSubmited(){
		
				this.authService.loginUser([
					this.Email.value,
					this.Password.value
			]).subscribe(
				{
					next: (res) => {
							if(res != "400"){
				 	this.authService.setToken(res);
					if(this.authService.HaveAccess()=="Student"){
						this.router.navigateByUrl('student-portal/' + this.authService.HaveAccessById())
					}else{
						this.router.navigateByUrl('/dashboard');
					}
				 	
				 }
					},
					error: (error) => {
									this.noMatch="d-block"
					}
	}
			)

		
	}

	 

	  
	

	

	// submited(){
		
	// 	if (this.user==this.username && this.psw==this.passwordn){
			
	// 		this.router.navigate(['dashboards/home'])
			
	// 		return	this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Login Successfully', life: 3000 });
			
			
	// 	}else{
	// 		this.noMatch="d-block"
			
	// 		return this.noMatch;
	// 	}
	// }

}
