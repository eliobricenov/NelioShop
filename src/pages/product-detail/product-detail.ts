import { MenuChangerProvider } from './../../providers/menu-changer/menu-changer';
import { CommentProvider } from './../../providers/comment/comment';
import { CommentChangerProvider } from './../../providers/comment-changer/comment-changer';
import { CartProvider } from './../../providers/cart/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public commCh: CommentChangerProvider, public commProvider:CommentProvider, public menuCh:MenuChangerProvider, public alertCtrl:AlertController) {
    this.product = navParams.get('product');
    this.mine = navParams.get('mine');
    console.log(this.product)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  ionViewDidEnter(){
    this.commProvider.read(this.product.id);
  }

  addToCart(){
  }

  dismiss(){
    this.navCtrl.pop();
  }

  editComm(i){
    let alert = this.alertCtrl.create({
      title: 'Editando comentario',
      inputs: [
        {
          name: 'comment',
          value: this.commCh.getByIndex(i).text
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.commProvider.update(data.comment).then((res)=>{
              console.log(res);
            }, (err)=>{
              console.log(err)
            })
          }
        }
      ]
    });
    alert.present();
  }

}
