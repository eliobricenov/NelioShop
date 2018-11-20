import { CartChangerProvider } from './../../providers/cart-changer/cart-changer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  searchInput:any;
  shouldShowCancel:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartCh:CartChangerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  onInput(e){
    console.log(e.target.value)
  }

  onCancel(e){
    console.log(e)
  }

}
