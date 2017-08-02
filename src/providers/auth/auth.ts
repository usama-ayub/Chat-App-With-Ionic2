import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserProvider } from '../user/user';

@Injectable()
export class AuthProvider {

  token: any;

  constructor(
    public afa: AngularFireAuth,
    public afd: AngularFireDatabase,
    public up: UserProvider,
  ) { }

  login(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
  }

  loginWithGoogle() {
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  isLoggedin() {
    return this.afa.authState;
  }

  register(email, password) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password)
  }

  logout() {
    return this.afa.auth.signOut();
  }

  changePassword(user, newPassword) {
    return user.updatePassword(newPassword)
  }

  saveToken(uid) {
    if (uid && this.token) return this.afd.object(`/user/${uid}/token/`).set(this.token);
  }

}
