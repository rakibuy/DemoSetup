import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 currentrole: any;
  constructor(private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    if(this.authService.isLogIn()){
     this.currentrole = this.authService.HaveAccess();

     if(this.currentrole == "Admin"){
      return true
     }else{
      return false
     }
      
      }else{
        
        return false;
      }
  }
  
}
