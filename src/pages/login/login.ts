import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { HelperProvider } from '../../providers/helper/helper';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  register: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ap: AuthProvider,
    public hp: HelperProvider,
  ) {

    this.register = RegisterPage;

  }

  login(user) {
    if (!user.valid) {
      return console.log('input field incomplete');
    }
    this.hp.presentLoading(false);
    this.ap.login(user.value.email, user.value.password).then(res => {
      this.hp.dismissLoading();
      this.hp.presentToast("Login Successful");
      localStorage.setItem('uid', res.uid);
      this.navCtrl.setRoot(HomePage);
    }, (error) => {
      this.hp.presentToast(error.message);
    });
  }

  ionViewDidLoad() {
    let userLogined = localStorage.getItem('uid')
    if (userLogined) return this.navCtrl.setRoot(HomePage);
  }

}
