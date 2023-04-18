import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update, onValue, set} from '@angular/fire/database';

@Component({
  selector: 'app-ala-fb',
  templateUrl: './ala-fb.component.html',
  styleUrls: ['./ala-fb.component.css']
})
export class AlaFBComponent implements OnInit {

 username =  sessionStorage.getItem('id');
 data = "";
name = "";
check = "";
com= "";
post = "";
//confirming stuff
role = true;
date = new Date()
admin = false;
//uniqe ids
cid="";
uuid = "";
// to save the current post or comment
currentpost=""
currentcomment="";
//display the comment f0rm or reply form
modeC=false;
modeR=false;
//where to put data from database
  account!: Observable<any[]>;
  comments!: Observable<any[]>;
  reply!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {

  this.account = FireDb.list('/post').valueChanges();


  const starCountRef = ref(this.database, 'accounts/' + this.username);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.name = db.name;
  this.role = db.user;
  this.admin = db.admin;
  
     });
}
  ngOnInit(): void {
   
  
    
  }

//posting
    postna(value:any){
      this.uuid = "post" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/' + this.uuid), {   
          name: value.name,
          post: value.post,
          id: this.uuid,
          rank: this.admin,
          date:this.date
   
         }); 
         value.reset()
         alert('Posted!');
         
        this.post = "";
        }


//commenting
        comm(value: any){

          this.cid = "comment" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/'+value.id+'/comment/ '+ this.cid), {   
          name: value.name,
          comment: value.post,
          id: this.cid,
          rank: this.admin,
          postid: value.id,       
          date:this.date
         }); 
         alert('commented!');

        this.post = "";

        }
        //replying
        rep(reply:any){
          this.cid = "reply" +Math.floor(100000 + Math.random() * 900000);
          set(ref(this.database, 'post/'+this.currentpost+'/comment/ '+this.currentcomment+'/reply/'+ this.cid), {   
              name: reply.name,
              reply: reply.post,
              id: this.cid,
              rank: this.admin,
              postid: this.currentpost,
              commentid: this.currentcomment,         
              date:this.date
             }); 
             alert('commented!');
    
            this.post = "";
            this.modeC=true;
            this.modeR=false;

        }
        //delete 
               del(value: any){
          remove(ref(this.database, 'post/' + value));
          alert('Deleted Successfully')
        }
        //delete comment
        delcomment(value: any){
            remove(ref(this.database, '/post/'+this.currentpost+'/comment/'+ value));
           alert('Deleted Successfully')
        }
        //delete reply
        delreply(value: any){
          remove(ref(this.database, '/post/'+this.currentpost+'/comment/ '+ this.currentcomment+'/reply/'+ value));
         alert('Deleted Successfully')
      }

//diplay comment
        getComment(post:any){
           this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
           this.currentpost=post;
           this.modeC=true;
           this.modeR=false;
           
        }
        //display reply
       getReply(reply:any){
     
           this.reply = this.FireDb.list('/post/'+this.currentpost+'/comment/ '+reply+'/reply/').valueChanges();
    
           this.currentcomment=reply  
          this.modeR=true;
          this.modeC=false;
          
       }



       }
