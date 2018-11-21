import { ProductChangerProvider } from './../../providers/product-changer/product-changer';
import { ProductDetailPage } from './../product-detail/product-detail';

import { ProductsProvider } from './../../providers/products/products';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchInput:any;
  shouldShowCancel:boolean = false;
  categorySearch:any = 'all'

  constructor(public actionSheetCtrl:ActionSheetController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, public prodCh:ProductChangerProvider, public prodService:ProductsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.prodService.read()
  }

  ionViewDidEnter(){
    this.prodService.read()
  }

  onInput(e){
    if(e.target.value == ''){
      this.prodService.read()
    }else{
      this.prodService.getByName(e.target.value);
    }
  }

  onCancel(e){
    console.log(e)
  }

  gotoDetail(e){
    const modal = this.modalCtrl.create(ProductDetailPage,{
      product: this.prodCh.getByIndex(e),
      mine: false
    });
    modal.present();
  }


}
