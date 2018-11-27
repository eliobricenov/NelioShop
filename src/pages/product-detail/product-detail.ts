import { ToasterProvider } from './../../providers/toaster/toaster';
import { LoadProvider } from './../../providers/load/load';
import { MenuChangerProvider } from './../../providers/menu-changer/menu-changer';
import { CommentProvider } from './../../providers/comment/comment';
import { CommentChangerProvider } from './../../providers/comment-changer/comment-changer';
import { CartProvider } from './../../providers/cart/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';

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

  comment:any = "";

  quantity:any = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commCh: CommentChangerProvider, public commProvider:CommentProvider, public menuCh:MenuChangerProvider, 
    public alertCtrl:AlertController, public actionSheetCtrl:ActionSheetController, public loadCtrl:LoadProvider, public toast:ToasterProvider) {
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

  createComm(){
    let d = {
      productId: this.product.id,
      text: this.comment
    }

    this.loadCtrl.present();
    this.commProvider.create(d).then((res:any)=>{
      console.log(res);
      this.loadCtrl.dismiss()
      this.toast.present({
        message: 'Comentario añadido!',
        duration: 2000
      })
    }, (err)=>{
      this.toast.present({
        message: err,
        duration: 2000
      })
      console.log(err)
      this.loadCtrl.dismiss()
    })
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
            let d = {
              id: this.commCh.getByIndex(i).id,
              text: data.comment,
              productId: this.product.id
            }
            this.loadCtrl.present();
            this.commProvider.update(d).then((res)=>{

              console.log(res);
              this.loadCtrl.dismiss()
              this.toast.present({
                message: 'Comentario editado!',
                duration: 2000
              })
              return false;
            }, (err)=>{
              this.loadCtrl.dismiss()
              this.toast.present({
                message: err,
                duration: 2000
              })
              console.log(err)
            })
          }
        }
      ]
    });
    alert.present();
  }

  actionSheet(i){
    let acS = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.editComm(i);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.loadCtrl.present();
            let commentId = this.commCh.getByIndex(i).id;
            this.commProvider.delete(commentId).then((res:any)=>{
              console.log(res)
              this.loadCtrl.dismiss()
              this.toast.present({
                message: 'Comentario eliminado!',
                duration: 2000
              })
            }, (err)=>{
              this.loadCtrl.dismiss()
              this.toast.present({
                message: err,
                duration: 2000
              })
              console.log(err)
            })
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
 
    acS.present();
  }

}
