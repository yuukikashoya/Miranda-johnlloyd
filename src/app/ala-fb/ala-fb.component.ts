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
role = true;
date = new Date()
admin = false;
com= "";
cid="";
post = "";
uuid = "";
  account!: Observable<any[]>;
  comments!: Observable<any[]>;
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

        del(value: any){
          remove(ref(this.database, 'post/' + value));
          alert('Deleted Successfully')
        }

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
       
        delcomment(value: any){
            remove(ref(this.database, '/post/'+this.currentpost+'/comment/'+ value));
           alert('Deleted Successfully')
        }

currentpost=""
        getComment(comment:any){
           this.comments = this.FireDb.list('/post/'+comment+'/comment/').valueChanges();
           this.currentpost=comment
        }



       }
