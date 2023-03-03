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


    postna(value:any){

        
      set(ref(this.database, 'post/' + value.name), {   
          name: value.name,
          post: value.post
         }); 
         alert('Posted!');
        }
       }
