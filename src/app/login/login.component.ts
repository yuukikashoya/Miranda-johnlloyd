import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword  } from "@angular/fire/auth";
import { Database,ref,update } from '@angular/fire/database';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public auth: Auth,public database:Database,private router:Router) { }

  ngOnInit(): void {
  }

  loginUser(value: any){
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const account = userCredential.user;

    alert('user login');
  const date = new Date();

  update(ref(this.database, 'accounts/' + account.uid),{
  last_login:date
  }
  
  );
  this.router.navigate(['/display'])
      // creadential dint match
    },err=>{
      alert(err.message)
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
  }

}
