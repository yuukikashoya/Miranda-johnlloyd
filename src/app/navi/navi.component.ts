import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  log =false;
  sign =false;
  dis = false;
  ala = false;
  event$ 
  val  ="" ;
  constructor(private router:Router) {

    this.event$
    =this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if(event instanceof NavigationStart) {
            
              this.val = event.url;

              if( this.val== '/login'){
                this.log = true;
                this.sign = false;
                this.dis = false;
                this.ala = false;

              }else if(this.val == '/signup'){
                this.sign = true;
                this.log = false;
                this.dis = false;
                this.ala= false;
              }else if(this.val == '/display'){
                this.dis = true;
                this.log= false;
                this.sign = false;
                this.ala = false
              }else if(this.val == '/fb'){
                this.ala= true;
                this.log=false;
                this.sign=false;
                this.dis=false;
          
              }
            }
          });





    
   }

  ngOnInit(): void {
  
  }
  ngOnDestroy() {
    this.event$.unsubscribe();
  }


}
