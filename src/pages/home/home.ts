import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FirebaseListObservable,AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserProvider } from '../../providers/user/user';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { ChatPage } from '../../pages/chat/chat';
import { UserDetailComponent } from './../../components/user-detail/user-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // getAllUser: FirebaseListObservable<any>;
  uid: any;
  tes: any
  allEmojis: any;
  getAllUser:any
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afd: AngularFireDatabase,
    public up: UserProvider,
    public ep: EmojiProvider
  ) { }

  ionViewDidLoad() {
    this.uid = this.up.loginUser().uid
    // this.getAllUser = this.up.getAllUsers()
    this.showIncomeMessage()
  }

  openChat(data) {
    let param = {
      uid: this.uid,
      interlocutor: data.$key,
      avatar: data.profileImageURL
    };
    this.hideIncomeMessage(data)
    this.navCtrl.push(ChatPage, param);
  }

  userDetail(event,data) {
    event.stopPropagation();
    let userModal = this.modalCtrl.create(UserDetailComponent, data);
    userModal.present();
  }

  showIncomeMessage() {
  this.up.getAllUsers().subscribe((users) => {
    this.getAllUser = users;
      console.log('users::::::', users)
         users.map((p, i) => {
        firebase.database().ref(`/notification/${p.uid}/notification`).once('value').then((snapshot) => {
          if (snapshot.val()) {
            p.incomingNotification = snapshot.val()
          }else{
            p.incomingNotification = false
          }
        })
      })
    })
  }

  hideIncomeMessage(users){
    this.afd.object(`/notification/${users.uid}`, { preserveSnapshot: true }).subscribe(snapshot => {
      let a = snapshot.exists();
      if (a) {
        this.afd.object(`/notification/${users.uid}`).update({notification:false})
      } else {
        false;
      }
    });

  }

}

