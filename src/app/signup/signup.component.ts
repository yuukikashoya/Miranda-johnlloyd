import { Component, OnInit } from '@angular/core';

import { Database,set,ref,onValue } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( public database:Database,private router:Router)  { }

  ngOnInit(): void {
  
  }
set="";

uuid = "";
ab = "";
role = true;
  registerUser(value:any){

    const starCountRef = ref(this.database, 'accounts/' + value.email);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.ab = db.email
 
     }); 
  
      
     if (  value.email == null || value.email == "" || value.password == null || value.password == "" 
      ||  value.name == null || value.name == "" ||  this.set == null || this.set == ""
      ){
        console.log(this.set)
      alert('Fill the form ');
     }else{
      if(this.ab == value.email){
       alert('user email already exist!'); 
      }
  
        
      else {
        if(value.user == "allow"){
          this.role = false;
        }else if(value.user == "ban"){
          this.role = true;
        }
        this.uuid = "user" +Math.floor(100000 + Math.random() * 900000);
    set(ref(this.database, 'accounts/' + value.email), {
        id: this.uuid,
        email: value.email,
        name: value.name,
        password: value.password,
        user: this.role
  
  
       }); 
       alert('account created!');
       this.router.navigate(['/login'])
      }
     }
     
  }


}
