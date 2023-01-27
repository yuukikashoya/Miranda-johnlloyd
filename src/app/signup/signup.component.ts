import { Component, OnInit } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from '@angular/fire/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth:Auth) { }

  ngOnInit(): void {
  }

  registerUser(value:any){
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      alert('account created');

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(value.auth, value.email, value.password);
      
      // ..
    });
  }


}
