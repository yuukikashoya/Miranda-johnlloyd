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
//name of liker and counter
likers = "";
likecounter = 0;
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
//post i forgot to change the name
  account!: Observable<any[]>;
  //for comment
  comments!: Observable<any[]>;
  // for reply
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
  //deley loading
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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

    
            this.post = "";
            this.modeC=true;
            this.modeR=false;

        }
        //delete 
               del(value: any){
          remove(ref(this.database, 'post/' + value));
          alert('Post Deleted')
        }
        //delete comment
        delcomment(value: any){
            remove(ref(this.database, '/post/'+this.currentpost+'/comment/'+ value));

        }
        //delete reply
        delreply(value: any){
          remove(ref(this.database, '/post/'+this.currentpost+'/comment/ '+ this.currentcomment+'/reply/'+ value));

      }

//diplay comment
        getComment(post:any){
           this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
           this.currentpost=post;
           this.modeC=true;
           this.modeR=false;
           const starCountRef1 = ref(this.database, 'post/'+ this.currentpost +'/like/'+ this.username);
           onValue(starCountRef1, (snapshot) => {
            const db1 = snapshot.val();  
         this.likers = db1.name;
            
         
            }); 
           
        }
        //display reply
       getReply(reply:any){
     
           this.reply = this.FireDb.list('/post/'+this.currentpost+'/comment/ '+reply+'/reply/').valueChanges();
    
           this.currentcomment=reply  
          this.modeR=true;
          this.modeC=false;
          
       }

//liking a post
        like(value:any){
           if(value == 0 || value == undefined || value == null){
           update(ref(this.database, 'post/' + this.currentpost),{
             likes:1
             } );
             set(ref(this.database, 'post/'+ this.currentpost +'/like/'+ this.username), {   
               name: this.username
              }); 
       }else{
         this.likecounter = value + 1;
         update(ref(this.database, 'post/' + this.currentpost),{
           likes:this.likecounter
           } );
           set(ref(this.database, 'post/'+ this.currentpost +'/like/'+ this.username), {   
             name: this.username
            }); 
       }
    }
    //unliking a post
    unlike(value:any){
      remove(ref(this.database, '/post/'+ this.currentpost +'/like/'+ this.username));
      this.likecounter = value - 1;
      update(ref(this.database, 'post/' + this.currentpost),{
        likes:this.likecounter
        } );
        this.likers=""
    }
}
