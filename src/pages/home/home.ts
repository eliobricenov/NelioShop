import { MenuChangerProvider } from './../../providers/menu-changer/menu-changer';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage:Storage, public menuChanger:MenuChangerProvider) {
  }

  ionViewDidEnter(){
    console.log("DidLoad")
    this.storage.get('userData').then(
      (val: any) => {
        console.log(val)
        if(val){
          this.menuChanger.user = val;
        }else{
          this.navCtrl.push("LoginPage")
        }
      }
    )
  }

  gotoLogin(){
    this.navCtrl.push('LoginPage')
  }

}
