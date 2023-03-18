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
sent = true;
  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {

  this.account = FireDb.list('/post').valueChanges();

  const starCountRef = ref(this.database, 'accounts/' + this.username);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.name = db.name;
  this.role = db.user;
  
     });


if(this.name != ""){
this.sent = true;
}else if(this.name == ""){
  this.sent = false;
  }

}

  ngOnInit(): void {
   
  
    
  }



post = "";
uuid = "";
    postna(value:any){
      this.uuid = "post" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/' + this.uuid), {   
          name: value.name,
          post: value.post,
          id: this.uuid
   
         }); 
         alert('Posted!');

        this.post = "";
        }

        del(value: any){
          remove(ref(this.database, 'post/' + value));
          alert('Deleted Successfully')
        }
       }
