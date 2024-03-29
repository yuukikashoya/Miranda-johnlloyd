import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlaFBComponent } from './ala-fb/ala-fb.component';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from './notification/notification.component';




const routes: Routes = [
  {path: 'signup',component:SignupComponent},
  {path: 'login',component:LoginComponent},
  {path: '',redirectTo:'signup',pathMatch:'full' },
  {path: 'fb',component:AlaFBComponent},
  {path: 'display',component:DisplayComponent},
  {path: 'noti',component:NotificationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const roott = [
  SignupComponent,LoginComponent,DisplayComponent
]
