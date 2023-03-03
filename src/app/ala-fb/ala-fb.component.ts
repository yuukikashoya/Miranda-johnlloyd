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
  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.account = FireDb.list('/post').valueChanges();}

  ngOnInit(): void {
  }

name =  sessionStorage.getItem('id');

post = "";
uuid = "";
    postna(value:any){
      this.uuid = "post" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/' + this.uuid), {   
          name: value.name,
          post: value.post
   
         }); 
         alert('Posted!');

        this.post = "";
        }
       }
