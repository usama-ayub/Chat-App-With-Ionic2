import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { UserProvider } from '../../providers/user/user';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { ChatPage } from '../../pages/chat/chat';
import { UserDetailComponent } from './../../components/user-detail/user-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  getAllUser: FirebaseListObservable<any>;
  uid: any;
  tes: any
  allEmojis: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public up: UserProvider,
    public ep: EmojiProvider
  ) { }

  ionViewDidLoad() {
    this.uid = this.up.loginUser().uid
    this.getAllUser = this.up.getAllUsers()
  }

  openChat(data) {
    let param = {
      uid: this.uid,
      interlocutor: data.$key,
      avatar: data.profileImageURL
    };
    this.navCtrl.push(ChatPage, param);
  }

  userDetail(data) {
    let userModal = this.modalCtrl.create(UserDetailComponent, data);
    userModal.present();
  }
}

