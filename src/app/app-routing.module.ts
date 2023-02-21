import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';




const routes: Routes = [
  {path: 'signup',component:SignupComponent},
  {path: 'login',component:LoginComponent},
  {path: '',redirectTo:'signup',pathMatch:'full' },
  {path: 'display',component:DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const roott = [
  SignupComponent,LoginComponent,DisplayComponent
]
