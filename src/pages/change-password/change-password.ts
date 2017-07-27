import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { HelperProvider } from './../../providers/helper/helper';

@Component({
  selector: 'ChangePasswordPage',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ap: AuthProvider,
    public up: UserProvider,
    public hp: HelperProvider,
  ) { }

  updatePassword(newPassword) {
    if (!newPassword.valid) return console.log('input field incomplete');
    if (newPassword.value.password.length <= 6) return this.hp.presentToast("Password must be 6 characters");
    let user = this.up.abc()
    this.ap.changePassword(user, newPassword.value.password)
      .then(res => {
        this.hp.presentToast("Password Successful Change");
      })
      .catch(error => {
        this.hp.presentToast(error.message);
      })
  }

  ionViewDidLoad() {

  }

}
