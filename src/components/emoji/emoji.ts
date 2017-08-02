import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { EmojiProvider } from './../../providers/emoji/emoji';

@Component({
  selector: 'emoji',
  templateUrl: 'emoji.html'
})
export class EmojiComponent {

  emoj: string;

  constructor(
    private emoji: EmojiProvider,
    public viewCtrl: ViewController
  ) {
    this.emoj = this.emoji.getAll();
  }

  close(emoji?) {
    this.viewCtrl.dismiss(emoji);
  }
  
}
