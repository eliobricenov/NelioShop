import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  userData:object = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData = this.navParams.get('userData');
    console.warn(this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeProfilePage');
    console.warn(this.userData);
  }

  ionViewWillLoad() {
    this.userData = this.navParams.get('userData');
  }

}
