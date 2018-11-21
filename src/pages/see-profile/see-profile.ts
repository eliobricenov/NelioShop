import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModifyProfilePage } from '../modify-profile/modify-profile';

/**
 * Generated class for the SeeProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-see-profile',
  templateUrl: 'see-profile.html',
})
export class SeeProfilePage {
  userData:object = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData = this.navParams.get('userData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeProfilePage');
  }

  ionViewWillLoad() {
    this.userData = this.navParams.get('userData');
  }

  goToEditPage() {
    this.navCtrl.push(ModifyProfilePage, {
      userData: this.userData
    });
  }

}
