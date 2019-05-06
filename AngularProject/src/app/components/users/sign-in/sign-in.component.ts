import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
   
    this.resetForm();
  }

  ngOnDestroy()
    {
      if(localStorage.getItem("token")!=null)
        {
          this.userService.isLogin = true;
          this.userService.GetUserClaims().subscribe((data:any)=>{
            this.userService.getLoggedIn.emit(data);
          })
        }
    }

  resetForm(formData?:NgForm)
    {
      if(formData)
      formData.reset();
      this.userService.userData={
        UserName:'',
        Password:'',
        Email:'',
        FirstName:'',
        LastName:''
      }
    }
    onSubmit(formData:NgForm)
      {
        console.log(formData.value);
        this.userService.SignIn(formData.value).subscribe((data:any)=>{
          console.log(data.token);
          localStorage.setItem('token',data.token);
          this.userService.isLogin=true;
          this.router.navigate(['/home']);
          
        },err=>{
          this.userService.isLoginError=true;
          this.userService.message=err.error.message;
        });
      }

}
