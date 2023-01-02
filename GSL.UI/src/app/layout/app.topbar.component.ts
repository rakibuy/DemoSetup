import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    ImageUrl:string = "";
    baseUrl:any;

    constructor(public layoutService: LayoutService,
        private authService:AuthService) { }
    ngOnInit(): void {
        this.ImageUrl = this.authService.HaveAccessByImageUrl();
        this.baseUrl = environment.baseUrl
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    
}