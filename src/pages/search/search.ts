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

  products:any = [
    {
      id:1,
      name: 'Producto',
      vendor: 'Nestor Amesty',
      price: '1000'
    },
    {
      id:2,
      name: 'Producto',
      vendor: 'Elio Briceno',
      price: '1500'
    },
    {
      id:3,
      name: 'Producto',
      vendor: 'Carlos Febres',
      price: '2000'
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(e){
    console.log(e.target.value)
  }

  onCancel(e){
    console.log(e)
  }

}
