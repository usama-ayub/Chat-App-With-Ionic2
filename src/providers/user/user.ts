import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth/auth';
@Injectable()
export class UserProvider {

  uid: any;

  constructor(
    public afd: AngularFireDatabase,
    public ap: AuthProvider,
  ) {
    this.ap.isLoggedin().subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
      return;
    });
  }

  createProfile(uid, user_name, email) {
    return this.afd.object('users/' + uid).set({
      uid,
      user_name,
      email,
      profileImageURL: 'https://www.gravatar.com/avatar?d=mm'
    });
  }

  updateProfile(uid, image) {
    return this.afd.object('users/' + uid).update({
      profileImageURL: image
    });
  }

  currentUser() {
    return this.afd.database.ref('/users/' + this.uid).once('value')
  }

  getAllUsers() {
    return this.afd.list('/users')
  }
}
