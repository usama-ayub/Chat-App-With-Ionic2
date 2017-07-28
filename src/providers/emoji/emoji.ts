import { Injectable } from '@angular/core';
declare var require: any
let emojis = require('../../config/emoji.json');

//import * as emojis from '../../config/emoji.json';

const PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;


@Injectable()
export class EmojiProvider {

  constructor() { }

  public get(emoji) {
    for (let data of emojis) {
      for (let e of data.aliases) {
        if (emoji === e) {
          return data.emoji;
        }
      }
    }
    return emoji;
  }

  public getAll() {
    return emojis;
  }

  public emojify(str) {
    return str.split(PARSE_REGEX).map((emoji, index) => {
      // Return every second element as an emoji
      if (index % 2 === 0) { return emoji; }
      return this.get(emoji);
    }).join('');
  }
}
