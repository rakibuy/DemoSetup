import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    user: any[] = [];

    staf:any[] = []
    account:any[]=[]
    student:any[]=[]
    showMenu:string = ""
    userRole:any = this.authService.UserRole;

    accessByID:number = 0;
    
   
    constructor(private authService:AuthService) { }

    ngOnInit() {
        this.showMenu = this.authService.HaveAccess();
        
        this.accessByID=this.authService.HaveAccessById();
       
        //admin  
        this.model = [

            {
                label: 'Student Manage',
                icon: 'pi pi-th-large',
                items: [
                {
                   
                        label: 'Client List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/registation/list']
                   
                },
                {
                   
                    label: 'Leads Upload',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/registation/list']
               
                },
                
                
               
              ]
          },
        ];

        //councilor  
        this.user = [

            {
                label: 'Student Manage',
                icon: 'pi pi-th-large',
                items: [
                    
                
                {
                   
                        label: 'Client List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/registation/list']
                   
                },
                
                
            
            

           
                
                
                
                   


                        
                        

                    
            
              
              ]
          },
        ];
    }
}
