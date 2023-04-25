import { Component, OnInit } from '@angular/core';
import { Database, onValue,ref ,remove} from '@angular/fire/database';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
    name="";
  log =false;
  sign =false;
  dis = false;
  ala = false;
  event$ 
  val  ="" ;

  username = sessionStorage.getItem('id');
  constructor(private router:Router,public database: Database) {

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


          const starCountRef = ref(this.database,'notification/notify/' + this.username);
           onValue(starCountRef, (snapshot) => {
            const db = snapshot.val();
            this.name = db.poster;
      
          });
           
 
    
   }

  ngOnInit(): void {
  
  }
  ngOnDestroy() {
    this.event$.unsubscribe();
  }
  readed(){
    remove(ref(this.database, 'notification/notify/' + this.username));
    console.log(this.username);
    this.name="";
    this.router.navigate(['/noti'])
  }

}
