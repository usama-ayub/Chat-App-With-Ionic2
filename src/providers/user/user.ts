import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  uid: any;

  constructor(
    public afd: AngularFireDatabase
  ) {
    this.uid = localStorage.getItem('uid')
  }

  createProfile(uid, user_name, email) {
    return this.afd.object('users/' + uid).set({
      uid,
      user_name,
      email,
      profileImageURL: 'https://www.gravatar.com/avatar?d=mm'
    });
  }

  currentUser() {
    return this.afd.database.ref('/users/' + this.uid).once('value')
  }

  getAllUsers() {
    return this.afd.list('/users')
  }
}
