import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Topic } from '../models/topic.model';
import { Comment } from '../models/comment.model';
import {apiPath} from '../../path/path';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  Topic:Topic;
  Comment:Comment;
  private socket=io('http://localhost:3000');

  constructor(private http:HttpClient) 
    {

    }

  openTopic(formData:Topic)
    {
      formData.TopicTime=new Date().toLocaleDateString();
      formData.User=""
      console.log(formData);
      return this.http.post(apiPath+"topics/opentopic",formData,{headers:new HttpHeaders({
        'Authorization':"Bearer " + localStorage.getItem("token")})});
    }
    getTopics()
    {
    
      return this.http.get(apiPath+"topics/gettopics");
    }
    getTopicComments(topicId:String)
    {
      return this.http.get(apiPath+"comments/getComments/"+topicId);
    }
    
    postComment(formData:Comment,TopicId:string)
      {
        console.log("geldi");

        formData.CommentTime=new Date().toLocaleDateString();
        formData.User="";
        formData.Topic=TopicId;
        return this.http.post(apiPath+"comments/postComments",formData,{headers:new HttpHeaders({
          'Authorization':"Bearer " + localStorage.getItem("token")})});

      }
   
    joinRoom(roomId:string)
      {
        console.log('join',roomId);
        this.socket.emit('join',{room:roomId});
      }
      commentRequest(TopicId:string)
      {
        debugger
        this.socket.emit("commentRequest",{room:TopicId});
       
      }
      getCommentSocket()
        {
          
          let observable=new Observable<{comment:any}>(observer=>{
            debugger
            this.socket.on("sendMessage",(data)=>{
              debugger;
              observer.next(data);
             });
          })
        return observable;
            
        }
        leave(TopicId:string)
        {
          this.socket.emit("leave",TopicId);
        
        }

}
