import { Component, Renderer } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.html'
})
export class UserDetailComponent {
  currentUser: any;
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public renderer: Renderer
  ) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    this.currentUser = this.navParams.data;
    console.log(this.navParams.data);
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
