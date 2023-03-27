
import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update,onValue} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  role = false;
  admin = false;
  say = "";
    account!: Observable<any[]>;
    constructor(public database: Database, private FireDb: AngularFireDatabase) {
  
    this.account = FireDb.list('/accounts').valueChanges();
  
    const starCountRef = ref(this.database, 'accounts/' + this.session);
      onValue(starCountRef, (snapshot) => {
       const db = snapshot.val();  
  
    this.role = db.user;
    this.admin = db.admin;
    
       });

      }
   
  ngOnInit(): void {


  }
  del(value: any){
    remove(ref(this.database, 'accounts/' + value));
    alert('Deleted Successfully')
  }
  session =  sessionStorage.getItem('id');
  email = "";
name = "";
password = "";
     edit(z: any) {
       this.email = z.email;
      this.name = z.name;
     }
  
     update(value:any){

   if(value.password == ""){
    alert('put the new password!');
   }else{
    update(ref(this.database, 'accounts/' + value.email), {
      password: value.password
    }); 
    this.email = "";
    this.name = "";
    this.password = "";
   alert('User updated!');
     
   }
    }
 
  }
  // keelow