import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;

  constructor(public navCtrl: NavController, storage:Storage) {
    storage.get('userData').then(
      (val: any) => {
        console.log(val)
        if(val){
          this.user = val;
        }else{
          
        }
      }
    )
  }

}
