import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { SeeProfilePage } from '../see-profile/see-profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageManager: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.userData);
  }

  async ionViewCanEnter() {
    try {
      this.userData = await this.storageManager.getData();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  goToData(): void {
    this.navCtrl.push(SeeProfilePage, {
      userData: this.userData
    });
  }

  goToSecurity() {
    
  }
}
