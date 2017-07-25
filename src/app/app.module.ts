import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { config } from '../config/config'

import { EmailValidator } from '../directives/emailvalidator';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';

import { AuthProvider } from '../providers/auth/auth';
import { HelperProvider } from '../providers/helper/helper';
import { UserProvider } from '../providers/user/user';
import { ChatProvider } from '../providers/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ProfileComponent } from '../components/profile/profile';

@NgModule({
  declarations: [
    EmailValidator,
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    ChatPage,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HelperProvider,
    AuthProvider,
    UserProvider,
    ChatProvider
  ]
})
export class AppModule { }
