import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private siteService:SiteService,private userService:UserService) { }

  topicsData:any;

  ngOnInit() {
    debugger
    this.userService.GetUserClaims().subscribe((data:any)=>{
      this.userService.getLoggedIn.emit(data.userData.Email);
    })
    this.siteService.getTopics().subscribe(data=>{
      this.topicsData=data;
      console.log(this.topicsData);
    })
  }

  onTopicContent(_id:String)
    {
      this.router.navigate([`/topic-content/${_id}`]);
    }


}
