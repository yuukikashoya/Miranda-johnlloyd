
import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.account = FireDb.list('/accounts').valueChanges();
   }
   
  ngOnInit(): void {


  }
  del(value: any){
    remove(ref(this.database, 'accounts/' + value));
    alert('Deleted Successfully')
  }
  email = "";
name = "";
 
     edit(z: any) {
       this.email = z.email;
      this.name = z.name;
     }
  
     update(value:any){
 
      update(ref(this.database, 'accounts/' + value.email), {
         password: value.password
       }); 
      alert('User updated!');
        
    }
 
  }
  // keelow