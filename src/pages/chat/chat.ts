import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  message: string;
  uid: string;
  interlocutor: string;
  chats: FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chat: ChatProvider,
    public afd: AngularFireDatabase,
  ) {

    this.uid = navParams.data.uid;
    this.interlocutor = navParams.data.interlocutor;

    // Get Chat Reference
    chat.getChatRef(this.uid, this.interlocutor)
      .then((chatRef: any) => {
        this.chats = this.afd.list(chatRef);
      });

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
        createdAt: firebase.database.ServerValue.TIMESTAMP
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
    this.chat.getPicture()
      .then((image) => {
        chat.picture = image;
        this.chats.push(chat);
      });
  }
}
