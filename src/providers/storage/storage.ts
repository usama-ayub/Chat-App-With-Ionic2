import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageProvider {
  storageRef: any;
  constructor() {
    this.storageRef = firebase.storage();
  }

  uploadProfile(uid, image) {
    const upload = this.storageRef.ref(`profile/${uid}/profileImg`)
      .put(image)
    return upload;
  }
}
