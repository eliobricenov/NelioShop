import { CartProvider } from './../../providers/cart/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product:any = 
  {
    id:'',
    name:'',
    vendor: '',
    price: '',
    category: '',
    description: '',
    image: '',
    quantity: 0
  };

  mine:any = false;

  quantity:any = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get('product');
    this.mine = navParams.get('mine');
    console.log(this.product)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  addToCart(){
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
