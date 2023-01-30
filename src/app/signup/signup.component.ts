import { Component, OnInit } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,  } from '@angular/fire/auth';
import { Database,set,ref } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth:Auth, public database:Database,private router:Router)  { }

  ngOnInit(): void {
  }

  registerUser(value:any){
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const account = userCredential.user;
      set(ref(this.database, 'accounts/' + account.uid),{
        name:value.password,
        email:value.email

      })
      alert('account created');
      this.router.navigate(['/login'])
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
 
      
      // ..
    });
  }


}
