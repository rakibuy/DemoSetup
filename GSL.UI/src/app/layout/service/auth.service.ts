import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../api/user';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httpClient: HttpClient) { }
currentUser:BehaviorSubject<any> = new BehaviorSubject(null);
 JwtHelperService = new JwtHelperService();

 UserRole:string="";

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getAll(): Observable<User[]> {
  return this.httpClient.get<User[]>(environment.baseUrl + '/User/GetAllUser')
  .pipe(
    catchError(this.errorHandler)
  )
}


loginUser(user: Array<String>){
  return this.httpClient.post( environment.baseUrl + "/JWTToken/login",{
    Email:user[0],
    Password:user[1]
    
  },{responseType:'text'})
}

setToken(token:string){
 localStorage.setItem('access_token', token);
 this.loadcurrentuser()
}
GetToken(){
  return localStorage.getItem('access_token')||'';
 }
loadcurrentuser(){
 const token = localStorage.getItem('access_token');
 const userinfo=token !=null? this.JwtHelperService.decodeToken(token):null;
 

 const data= userinfo?{
   id:userinfo.id,
   Email:userinfo.Email,
   Username:userinfo.Username,
   Role:userinfo.role,
   exp:userinfo.exp,
 }:null
 this.currentUser.next(data)
 return data
}
isLogIn():boolean{
return localStorage.getItem("access_token")?true:false;
}
removeToken(){
 localStorage.removeItem("access_token")
}

HaveAccess(){
  var loggintoken=localStorage.getItem('access_token')||'';
  var _extractedtoken=loggintoken.split('.')[1];
  var _atobdata=atob(_extractedtoken);
  var _finaldata=JSON.parse(_atobdata);
  
  if(_finaldata.Role == 'Admin'){
    return 'Admin';
  }else if(_finaldata.Role == 'Councilor'){
    return 'Councilor'
   
  }else if(_finaldata.Role == 'Staf'){
    return 'Staf'
   
  }
else if(_finaldata.Role == 'Accounte'){
    return 'Accounte'
   
  }
  else if(_finaldata.Role == 'Student'){
    return 'Student'
  }else{
    return 'not Found'
  }
}
 
HaveAccessById(){
  var loggintoken=localStorage.getItem('access_token')||'';
  var _extractedtoken=loggintoken.split('.')[1];
  var _atobdata=atob(_extractedtoken);
  var _finaldata=JSON.parse(_atobdata);
  
  
  return _finaldata.Id;
}


HaveAccessByName(){
  var loggintoken=localStorage.getItem('access_token')||'';
  var _extractedtoken=loggintoken.split('.')[1];
  var _atobdata=atob(_extractedtoken);
  var _finaldata=JSON.parse(_atobdata);
  
  
  return _finaldata.FullName;
}

HaveAccessByImageUrl(){
  var loggintoken=localStorage.getItem('access_token')||'';
  var _extractedtoken=loggintoken.split('.')[1];
  var _atobdata=atob(_extractedtoken);
  var _finaldata=JSON.parse(_atobdata);
  
  
  return _finaldata.ImageUrl;
}












errorHandler(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
