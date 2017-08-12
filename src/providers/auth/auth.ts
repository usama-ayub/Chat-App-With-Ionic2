import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserProvider } from '../user/user';

@Injectable()
export class AuthProvider {

  token: any;

  constructor(
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    public afa: AngularFireAuth,
    public afd: AngularFireDatabase,
    public up: UserProvider,
  ) { }

  login(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
  }

  /*  loginWithGoogle() {
     this.googlePlus.login({
       'webClientId': '621842033369-7bu3ps5kp0vmeiasfa392qtj6bii9n4r.apps.googleusercontent.com',
     })
       .then(res => console.log('Logged into Google!', res))
       .catch(err => console.log('Error logging into Google', err));
     //return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   } */
  loginWithGoogle() {
    let promise = new Promise((resolve, reject) => {
      this.googlePlus.login({
        'webClientId': '621842033369-7bu3ps5kp0vmeiasfa392qtj6bii9n4r.apps.googleusercontent.com',
      })
        .then((res) => {
          const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
          resolve(this.afa.auth.signInWithCredential(firecreds));
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }
  loginWithFacebook() {
    this.facebook.login(['email'])
      .then((res) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
    // return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
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
    console.log('uid',uid);
    console.log('token)',this.token);
    if (uid && this.token) return this.afd.object(`/user/${uid}/token/`).set(this.token);
  }

}
