import { LoadProvider } from './../../providers/load/load';
import { ProductDetailPage } from './../product-detail/product-detail';
import { AddProductPage } from './../add-product/add-product';
import { ProductChangerProvider } from './../../providers/product-changer/product-changer';
import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToasterProvider } from '../../providers/toaster/toaster';

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

  constructor(public actionSheetCtrl:ActionSheetController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, public prodService:ProductsProvider, public prodCh:ProductChangerProvider,
  public toast:ToasterProvider, public loader:LoadProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  ionViewDidEnter(){
    this.prodService.getMyProducts();
  }

  openCreate(){
    const modal = this.modalCtrl.create(AddProductPage);
    modal.present();
  }

  openEdit(i){
    const modal = this.modalCtrl.create(AddProductPage,{
      product: this.prodCh.getByIndex(i),
      edit: true
    });
    modal.present();
  }

  openDetail(x){
    const modal = this.modalCtrl.create(ProductDetailPage,{
      product: this.prodCh.getByIndex(x),
      mine: true
    });
    modal.present();
  }

  presentActionSheet(i) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.openEdit(i);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            let productId = this.prodCh.getByIndex(i).id;
            this.deleteProduct(productId);

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  deleteProduct(id){
    this.loader.present();
    this.prodService.delete(id).then(
      (res: any) => {
        this.toast.present({
          message: 'Publicación eliminada!',
          duration: 2000
        })
        console.log(res);
      },
      (err: any) => {
        this.toast.present({
          message: err,
          duration: 2000
        })
        console.log(err);
      });
  }



}
