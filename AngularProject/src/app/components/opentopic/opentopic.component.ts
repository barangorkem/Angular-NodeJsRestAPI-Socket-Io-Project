import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/shared/services/site.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Topic } from 'src/app/shared/models/topic.model';

@Component({
  selector: 'app-opentopic',
  templateUrl: './opentopic.component.html',
  styleUrls: ['./opentopic.component.css']
})
export class OpentopicComponent implements OnInit {

  constructor(private siteService:SiteService,private router:Router) { }

  resetForm(form?:NgForm)
    {
      if(form)
      this.resetForm();
      this.siteService.Topic={
        TopicName:"",
        TopicTime:"",
        User:"",
        _id:""
      };
    }
    ngOnInit() {
   
      this.resetForm();
    }

  onSubmit(formData:NgForm)
    {
      this.siteService.openTopic(formData.value).subscribe((data:any)=>{
        this.router.navigate([`/topic-content/`+data._id]);
      },err=>{
        console.log(err);
      })
    }
  

}
