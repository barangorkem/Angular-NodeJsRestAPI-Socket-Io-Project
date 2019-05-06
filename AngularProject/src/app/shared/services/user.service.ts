import { Injectable,EventEmitter,Output } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {apiPath} from '../../path/path';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();
  

  userData:User;
  isLoginError:boolean=false;
  isLogin:boolean;
  message:String;
  constructor(private http:HttpClient) 
  { 
    debugger
    if (localStorage.getItem("token") != null) {
      this.isLogin = true;
      this.GetUserClaims().subscribe((data:any)=>{
        this.getLoggedIn.emit(data);
      })
    }
    else {
      this.isLogin = false;
    }
  }




  
  SignUp(formData:User)
    {
   return  this.http.post(apiPath+"users/signup",formData);
    }
    SignIn(formData:User)
    {
   return  this.http.post(apiPath+"users/signin",formData);
    }
  GetUserClaims()
    {
    return this.http.get(apiPath+"users/getUserClaims", {headers:new HttpHeaders({
      'Authorization':"Bearer " + localStorage.getItem("token")})});
    }
}
