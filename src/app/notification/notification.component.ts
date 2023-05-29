import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification!: Observable<any[]>;
  username = sessionStorage.getItem('id');
  constructor(public database: Database, private FireDb: AngularFireDatabase) { 
    this.notification = FireDb.list('/notification').valueChanges();

  }

  ngOnInit(): void {
  }

}
