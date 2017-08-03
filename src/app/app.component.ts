import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { AuthProvider } from '../providers/auth/auth';
import { HelperProvider } from '../providers/helper/helper';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { ChangePasswordPage } from '../pages/change-password/change-password';

declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  uid: any;
  pages: Array<{ title: string, component: any, status: any }>;
  userLogined: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public fcm: FCM,
    public ap: AuthProvider,
    public hp: HelperProvider,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, status: false },
      { title: 'Login', component: LoginPage, status: true },
      { title: 'Register', component: RegisterPage, status: true },
      { title: 'Profile', component: ProfilePage, status: false },
      { title: 'Change Password', component: ChangePasswordPage, status: false },
      { title: 'Logout', component: null, status: false }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.ap.isLoggedin()
      .subscribe((user) => {
        if (user) {
          this.uid = user.uid;
          this.pages[0].status = true;
          this.pages[1].status = false;
          this.pages[2].status = false;
          this.pages[3].status = true;
          this.pages[4].status = true;
          this.pages[5].status = true;
          this.ap.saveToken(this.uid);
          return this.nav.setRoot(HomePage);
        }
      });
    /* try {
      this.initPushNotification();
    } catch (err) {
      console.log('initPushNotification Error', err);
    } */

  }

  initPushNotification() {
    window.FirebasePlugin.getToken.then(token => {
      this.ap.token = token;
      this.ap.saveToken(this.uid);
    })


    window.FirebasePlugin.onNotificationOpen(function (notification) {
      console.log(notification);
      if (notification.wasTapped) {
        let params = { uid: notification.senderId, interlocutor: notification.receiverId }
        this.nav.push(ChatPage, params);
      } else {
        let alert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message,
          buttons: [
            {
              text: 'OK',
            },
            {
              text: 'View',
              handler: data => {
                let params = { uid: notification.senderId, interlocutor: notification.receiverId }
                this.nav.push(ChatPage, params);
              }
            }
          ]
        });
        alert.present();
      }
    }, function (error) {
      console.error(error);
    });


    window.FirebasePlugin.onTokenRefresh(function (token) {
      this.ap.token = token;
      this.ap.saveToken(this.uid);
    }, function (error) {
      console.error(error);
    });
    
  }










  openPage(page) {
    if (page.title === 'Logout') {
      return this.logout();
    }
    if (page.title === 'Home' || page.title === 'Login' || page.title === 'Register') {
      this.nav.setRoot(page.component);
      return;
    }
    this.nav.push(page.component);
  }
  logout() {
    //this.hp.presentLoading(false);
    this.ap.logout().then(res => {
      this.nav.setRoot(LoginPage);
      this.pages[0].status = false;
      this.pages[1].status = true;
      this.pages[2].status = true;
      this.pages[3].status = false;
      this.pages[4].status = false;
      this.pages[5].status = false;
      // this.hp.dismissLoading("logout");
      this.hp.presentToast('Logout Successful!');
    }).catch(err => {
      // this.hp.dismissLoading("logout catch");
      this.hp.presentToast('Something Wrong');
    });
  }
}
