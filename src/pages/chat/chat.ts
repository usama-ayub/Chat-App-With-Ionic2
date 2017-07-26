import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  message: string;
  uid: string;
  avatar: string;
  interlocutor: string;
  chats: FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public cp: ChatProvider,
    public up: UserProvider,
    public afd: AngularFireDatabase,
  ) {

    this.uid = navParams.data.uid;
    this.interlocutor = navParams.data.interlocutor;

    // Get Chat Reference
    cp.getChatRef(this.uid, this.interlocutor)
      .then((chatRef: any) => {
        this.chats = this.afd.list(chatRef);
      });

    this.up.currentUser().then(snapshot => {
      this.avatar = snapshot.val().profileImageURL;
    }, (error) => {
      console.log(error);
    })

  }

  ionViewDidLoad() {
    this.content.scrollToBottom();
  }

  sendMessage() {
    if (this.message) {
      let chat = {
        from: this.uid,
        message: this.message,
        type: 'message',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        avatar: this.avatar
      };
      this.chats.push(chat);
      this.message = "";
    }
  };
  sendPicture() {
    let chat = {
      from: this.uid,
      type: 'picture',
      picture: null,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'From Camera',
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            this.cp.getPicture(1)
              .then((image) => {
                chat.picture = image;
                this.chats.push(chat);
              });
          }
        }, {
          text: 'From Gallery ',
          role: 'destructive',
          icon: 'images',
          handler: () => {
            this.cp.getPicture(0)
              .then((image) => {
                chat.picture = image;
                this.chats.push(chat);
              });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
