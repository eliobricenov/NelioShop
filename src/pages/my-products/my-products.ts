import { AddProductPage } from './../add-product/add-product';
import { ProductChangerProvider } from './../../providers/product-changer/product-changer';
import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the MyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  constructor(public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, public prodService:ProductsProvider, public prodCh:ProductChangerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  openCreate(){
    const modal = this.modalCtrl.create(AddProductPage);
    modal.present();
  }



}
