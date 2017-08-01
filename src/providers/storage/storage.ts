import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageProvider {
  storageRef: any;
  constructor() {
    //this.storageRef = firebase.storage();
  }

  uploadProfile(uid, image) {
    var upload = firebase.storage().ref(`profile/${uid}/profileImg.jpg`)
      .putString(image, 'data_url');
    let promise = new Promise((resolve, reject) => {
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { },
        (err) => { reject(err) },
        () => { resolve(upload.snapshot.downloadURL) });
    });
    return promise;

  }
}
