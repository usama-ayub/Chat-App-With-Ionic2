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
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { HelperProvider } from '../providers/helper/helper';
import { ChatProvider } from '../providers/chat/chat';
import { EmojiProvider } from '../providers/emoji/emoji';
import { StorageProvider } from '../providers/storage/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FilePath } from '@ionic-native/file-path';
import { FCM } from '@ionic-native/fcm';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { EmojiComponent } from '../components/emoji/emoji';
import { UserDetailComponent } from '../components/user-detail/user-detail';


@NgModule({
  declarations: [
    EmailValidator,
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    ChatPage,
    ProfilePage,
    ChangePasswordPage,
    EmojiComponent,
    UserDetailComponent
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
    ChatPage,
    ProfilePage,
    ChangePasswordPage,
    EmojiComponent,
    UserDetailComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Crop,
    FilePath,
    FCM,
    Facebook,
    GooglePlus,
    SpeechRecognition,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HelperProvider,
    UserProvider,
    AuthProvider,
    ChatProvider,
    EmojiProvider,
    StorageProvider
  ]
})
export class AppModule { }
