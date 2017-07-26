import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { FilePath } from '@ionic-native/file-path';

import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public up: UserProvider,
    public cp: ChatProvider,
    public hp: HelperProvider,
    private crop: Crop,
    private filePath: FilePath
  ) {

    this.up.currentUser().then(snapshot => {
      this.currentUser = snapshot.val();
      console.log(this.currentUser.uid);
    }, (error) => {
      console.log(error);
    })

  }

  updatePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'From Camera',
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            this.fromCamera();
          }
        }, {
          text: 'From Gallery ',
          role: 'destructive',
          icon: 'images',
          handler: () => {
            this.fromGallery();
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
  fromCamera() {
    this.cp.getPicture(1)
      .then((image) => {
        this.crop.crop(image, { quality: 75 })
          .then((newImage) => {
            this.up.updateProfile(this.currentUser.uid, newImage)
              .then(res => {
                this.hp.presentToast("Profile Change");
              }).catch(error => {
                this.hp.presentToast(error.message);
              })
            console.log('new image path is: ' + newImage)
          })
          .catch(error => {
            console.error('Error cropping image', error)
          });
      });
  }

  fromGallery() {
    this.cp.getPicture(0)
      .then((image) => {
        let images = 'file://' + image
        this.crop.crop(images, { quality: 75 })
          .then((newImage) => {
            newImage = "data:image/jpeg;base64," + newImage
            this.up.updateProfile(this.currentUser.uid, newImage)
              .then(res => {
                this.hp.presentToast("Profile Change");
              }).catch(error => {
                this.hp.presentToast(error.message);
              })
            console.log('new image path is: ' + newImage)
          })
          .catch(error => {
            console.error('Error cropping image', error)
          });
      });
  }
  ionViewDidLoad() { }

}
