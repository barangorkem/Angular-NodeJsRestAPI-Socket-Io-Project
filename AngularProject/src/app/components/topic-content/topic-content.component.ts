import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SiteService } from 'src/app/shared/services/site.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.css']
})
export class TopicContentComponent implements OnInit {

  comments:any[];
  constructor(private route: ActivatedRoute,private siteService:SiteService) { }

  resetForm(form?:NgForm)
    {
      if(form)
      this.resetForm();
      this.siteService.Comment={
        CommentContent:"",
        CommentTime:"",
        User:"",
        _id:"",
        Topic:""
      };
    };
   
  ngOnInit() {
    this.resetForm();
    const id=this.route.snapshot.paramMap.get("topicId");
    debugger
    this.siteService.joinRoom(id);
  
    this.siteService.commentRequest(id);
    this.siteService.getCommentSocket().subscribe((data:any)=>{
      if(Array.isArray(data.comment))
        {
          this.comments=data.comment;
        }
      else
        {
           if(!this.comments.find(x => x._id == data.comment._id))
            {
              this.comments.push(data.comment);
            }     
        }
    })
  } 
  ngOnDestroy() {
    debugger;
    const id=this.route.snapshot.paramMap.get("topicId");
    this.siteService.leave(id);
    console.log("ayrıldı");
  
  }
  onSubmit(formData:NgForm)
    {
      const TopicId=this.route.snapshot.paramMap.get("topicId");
      this.siteService.postComment(formData.value,TopicId).subscribe((x)=>{
        
      },err=>{
        console.log(err);
      });

    }

}
