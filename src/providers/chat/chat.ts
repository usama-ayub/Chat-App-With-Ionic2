import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ChatProvider {

  constructor(
    public afd: AngularFireDatabase,
    public camera: Camera,
  ) { }

  getChatRef(uid, interlocutor) {
    let promise = new Promise((resolve, reject) => {
      let firstRef = this.afd.object(`/chats/${uid},${interlocutor}`, { preserveSnapshot: true });
      firstRef.subscribe(snapshot => {
        let a = snapshot.exists();
        if (a) {
          resolve(`/chats/${uid},${interlocutor}`);
        } else {
          resolve(`/chats/${interlocutor},${uid}`);
        }
      });
    });

    return promise;
  }

  // Get base64 Picture of User
  getPicture(sourceType: number) {
    let base64Picture;
    let options = {
      destinationType: 2,
      sourceType: sourceType,
      encodingType: 0,
      allowEdit: true,
      correctOrientation: true
    };

    let promise = new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imageData) => {
        base64Picture = imageData;
        resolve(base64Picture);
      }, (error) => {
        reject(error);
      });

    });
    return promise;
  }

  /* cameraPicture() {
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };

    let promise = new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imageData) => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
      }, (error) => {
        reject(error);
      });

    });
    return promise;
  } */
}
