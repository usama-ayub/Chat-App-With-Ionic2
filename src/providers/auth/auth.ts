import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(
    public afa: AngularFireAuth,
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
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
}
