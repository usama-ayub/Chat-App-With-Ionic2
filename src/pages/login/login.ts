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
  ) { }

  login(user) {
    if (!user.valid) {
      return console.log('input field incomplete');
    }
    //this.hp.presentLoading(false);
    this.ap.login(user.value.email, user.value.password)
      .then(res => {
        //this.hp.dismissLoading("login");
        this.hp.presentToast("Login Successful");
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        //this.hp.dismissLoading("login catch");
        this.hp.presentToast(error.message);
      });
  }

  toRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

  ionViewDidLoad() {

  }

}
