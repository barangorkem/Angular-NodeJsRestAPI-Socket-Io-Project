import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.resetForm();
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
      this.userService.SignUp(formData.value).subscribe((data:any)=>{
      this.router.navigate(['/']);
      },err=>{
        console.log(err.error.message);
      })
    }
}
