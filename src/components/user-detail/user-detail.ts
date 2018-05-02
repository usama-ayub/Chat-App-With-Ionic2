import { Component, Renderer } from '@angular/core';
import { ViewController, NavParams,NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.html'
})
export class UserDetailComponent {
  currentUser: any;
  uid:string
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public renderer: Renderer,
    public navCtrl: NavController,
    public up: UserProvider
  ) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    this.currentUser = this.navParams.data;
    console.log(this.navParams.data);
  }
  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.uid = this.up.loginUser().uid
  }

  openChat(data) {
    let param = {
      uid: this.uid,
      interlocutor: data.$key,
      avatar: data.profileImageURL
    };
    this.navCtrl.push(ChatPage, param);
    this.close();
  }
}
