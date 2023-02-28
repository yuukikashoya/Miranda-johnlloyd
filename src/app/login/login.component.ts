import { Component, OnInit } from '@angular/core';

import { Database,ref,update,onValue } from '@angular/fire/database';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public database:Database,private router:Router) { }
  
  ngOnInit(): void {
  }

  loginUser(value: any){   
     const starCountRef = ref(this.database, 'accounts/' + value.email);
  onValue(starCountRef, (snapshot) => {
   const db = snapshot.val();  

   if (db.password == value.password){
          const date = new Date();
    update(ref(this.database, 'accounts/' + value.email),{
      last_login:date
      } );


    this.router.navigate(['/display'])
   }else{
    alert('wrong credential!');
   }
   }); 
  
  }

}
