import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  getAllUser: FirebaseListObservable<any>;
  uid: any;

  constructor(
    public navCtrl: NavController,
    public up: UserProvider,
  ) {
    this.uid = localStorage.getItem('uid');
  }

  openChat(id){

  }

  ionViewDidLoad() {
    this.up.currentUser().then(snapshot => {
      console.log(snapshot.val());
    }, (error) => {
      console.log(error);
    })
    this.getAllUser = this.up.getAllUsers()
    console.log(this.getAllUser);
  }
}
