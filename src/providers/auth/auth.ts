import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { UserProvider } from '../user/user';

@Injectable()
export class AuthProvider {

  constructor(
    public afa: AngularFireAuth,
    public up: UserProvider,
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

  changePassword(user, newPassword) {
    return user.updatePassword(newPassword)
  }
  
}
