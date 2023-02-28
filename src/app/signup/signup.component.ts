import { Component, OnInit } from '@angular/core';

import { Database,set,ref } from '@angular/fire/database';
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
uuid = "";
  registerUser(value:any){
    if(value.email == null || value.email == "" || value.password == null || value.password == "" 
    ||  value.name == null || value.name == ""
    
    ){
      alert('Fill the form ');
    }

      
    else {
      this.uuid = "user" +Math.floor(100000 + Math.random() * 900000);
  set(ref(this.database, 'accounts/' + value.email), {
      id: this.uuid,
      email: value.email,
      name: value.name,
      password: value.password


     }); 
     alert('account created!');
     this.router.navigate(['/login'])
    }
  }


}
