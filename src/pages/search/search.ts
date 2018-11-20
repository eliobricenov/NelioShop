
import { ProductsProvider } from './../../providers/products/products';
import { ProductChangerProvider } from './../../providers/product-changer/product-changer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public prodCh:ProductChangerProvider, public prodService:ProductsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    
  }

  ionViewDidEnter(){
    this.prodService.read()
  }

  onInput(e){
    this.prodService.getByName(e.target.value);
  }

  onCancel(e){
    console.log(e)
  }

  gotoDetail(e){
    this.navCtrl.push('ProductDetailPage',{
      product: this.prodCh.getByIndex(e)
    })
  }

}
