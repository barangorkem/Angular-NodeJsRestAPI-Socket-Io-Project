import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }
  Email:String;
  ngOnInit() {
    debugger
    this.userService.getLoggedIn.subscribe(data=>{
      if(data)
        {
          this.Email=data.userData.Email as String;
        }
     else
        {
          this.Email="";
        }
    }); 
  }
  LogOut()
  {
    localStorage.removeItem('token');
    this.userService.getLoggedIn.emit("");
    this.userService.isLogin=false;
    this.router.navigate(['/']);
  }
}
