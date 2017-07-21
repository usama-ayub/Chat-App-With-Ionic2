import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { HelperProvider } from '../../providers/helper/helper';

import { LoginPage } from './../login/login';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  login: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ap: AuthProvider,
    public up: UserProvider,
    public hp: HelperProvider,
  ) {
    this.login = LoginPage;
  }

  register(user) {
    if (!user.valid) {
      return console.log('input field incomplete');
    }
    this.hp.presentLoading(false);
    this.ap.register(user.value.email, user.value.password).then(res => {
      let user_name = res.email.split("@");
      localStorage.setItem('uid', res.uid);
      this.up.createProfile(res.uid, user_name[0], res.email).then(res => {
        this.hp.dismissLoading();
        this.hp.presentToast("Register Successful");
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        this.hp.dismissLoading();
        this.hp.presentToast(error.message);
      })

      console.log(res);
    }, (error) => {
      this.hp.dismissLoading();
      this.hp.presentToast(error.message);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
