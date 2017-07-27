import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  uid: any;

  constructor(
    public afd: AngularFireDatabase,
    public afa: AngularFireAuth
  ) { }

  abc() {
    return this.afa.auth.currentUser;
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
    this.uid = this.afa.auth.currentUser.uid;
    return this.afd.database.ref('/users/' + this.uid).once('value')
  }

  getAllUsers() {
    return this.afd.list('/users')
  }
}
