import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { HelperProvider } from '../providers/helper/helper';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, status: any }>;
  userLogined: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ap: AuthProvider,
    public hp: HelperProvider,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, status: false },
      { title: 'Register', component: RegisterPage, status: true },
      { title: 'Login', component: LoginPage, status: true },
      { title: 'Logout', component: null, status: false },
      { title: 'Profile', component: ProfilePage, status: false },
      { title: 'Change Password', component: ChangePasswordPage, status: false },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.ap.isLoggedin().subscribe((user) => {
      if (user) {
        this.pages[0].status = true;
        this.pages[1].status = false;
        this.pages[2].status = false;
        this.pages[3].status = true;
        this.pages[4].status = true;
        this.pages[5].status = true;
        return this.nav.setRoot(HomePage);
      }
    });
  }

  openPage(page) {
    if (page.title === 'Logout') {
      return this.logout();
    }
    this.nav.setRoot(page.component);
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
