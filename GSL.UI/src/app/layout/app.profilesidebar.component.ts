import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './api/user';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {
    
    fullName:string=""
    UserId:any;

    constructor(public layoutService: LayoutService, 
        private router: Router,
        private authService:AuthService) { }
        
        ngOnInit(): void {
            this.fullName = this.authService.HaveAccessByName();
            this.UserId = this.authService.HaveAccessById();
        }
    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    removeToken(){
        localStorage.removeItem("access_token")
        return this.router.navigate(['/login'])
       }

    profile(){
        return this.router.navigate(['/student-portal/' + this.UserId])
       }
       
    logout(){
       return this.router.navigate(['/']) 
    }
}