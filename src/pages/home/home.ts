import { CartChangerProvider } from './../../providers/cart-changer/cart-changer';
import { ProductsProvider } from './../../providers/products/products';
import { CartProvider } from './../../providers/cart/cart';
import { StorageProvider } from './../../providers/storage/storage';
import { MenuChangerProvider } from './../../providers/menu-changer/menu-changer';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public storageManager:StorageProvider,public navCtrl: NavController, public storage:Storage, public menuChanger:MenuChangerProvider,
  public cartProvider:CartProvider, public prodService:ProductsProvider, public cartCh:CartChangerProvider) {
  }


  async ionViewCanEnter() {
    try {
      this.menuChanger.user = await this.storageManager.getData();
      return true;
    } catch (error) {
      this.navCtrl.push("LoginPage")
      return false;
    }
  }

  ionViewDidLoad(){
    this.prodService.read().then((res) => {
      this.cartProvider.read()
    }, (err) => {
    })
  }

  gotoLogin(){
    this.navCtrl.push('LoginPage')
  }

  gotoSearch(){
    this.navCtrl.push('SearchPage');
  }

}
