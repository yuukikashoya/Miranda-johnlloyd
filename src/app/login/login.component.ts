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
data = "";
name = "";
  loginUser(value: any){   
    if (  value.email == null || value.email == "" || value.password == null || value.password == "" 
   
    ){
      alert('Fill the form ');
     }else{
     const starCountRef = ref(this.database, 'accounts/' + value.email);
  onValue(starCountRef, (snapshot) => {
   const db = snapshot.val();  
this.data = db.password;
this.name = db.name;

   }); 
   if (this.data == value.password){
    const date = new Date();
update(ref(this.database, 'accounts/' + value.email),{
last_login:date
} );
sessionStorage.setItem('id',value.email);

this.router.navigate(['/fb'])
}else{
alert('wrong credential!');
}
  }}

}
