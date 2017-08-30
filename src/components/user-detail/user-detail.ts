import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.html'
})
export class UserDetailComponent {



  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    console.log(this.navParams.data);
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
