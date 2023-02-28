
import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.account = FireDb.list('/accounts').valueChanges();
   }
   
  ngOnInit(): void {


  }
  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }

 
  }