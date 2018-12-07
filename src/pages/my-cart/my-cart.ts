import { LoadProvider } from './../../providers/load/load';
import { ToasterProvider } from './../../providers/toaster/toaster';
import { ProductChangerProvider } from './../../providers/product-changer/product-changer';
import { ProductsProvider } from './../../providers/products/products';
import { CartProvider } from './../../providers/cart/cart';
import { ProductDetailPage } from './../product-detail/product-detail';
import { CartChangerProvider } from './../../providers/cart-changer/cart-changer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

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

  searchInput: any;
  shouldShowCancel: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartCh: CartChangerProvider,
    public modalCtrl: ModalController, public cartProvider: CartProvider, public prodService: ProductsProvider,
    public actionSheetCtrl: ActionSheetController, public prodCh: ProductChangerProvider,
     public alertCtrl: AlertController, public toast:ToasterProvider, public load:LoadProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  onInput(e) {
    console.log(e.target.value)
  }

  onCancel(e) {
    console.log(e)
  }

  ionViewCanEnter() {

  }

  ionViewDidEnter() {

    this.prodService.read().then((res) => {
      this.cartProvider.read()
    }, (err) => {
    })
  }

  gotoDetail(e) {
    const modal = this.modalCtrl.create(ProductDetailPage, {
      product: this.cartCh.getByIndex(e),
      mine: false
    });
    modal.present();
  }

  presentActionSheet(i) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.editQuantity(i);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.deleteCartProd(i)
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

  editQuantity(i) {
    let alert = this.alertCtrl.create({
      title: 'Editando cantidad',
      inputs: [
        {
          name: 'qu',
          value: this.cartCh.getByIndex(i).added,
          type: 'number'
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
              productId: this.cartCh.getByIndex(i).id,
              quantity: data.qu
            }
            if (data.qu <= this.prodCh.findById(d.productId).quantity && data.qu > 0) {
              this.cartProvider.update(d).then((res) => {
                this.load.dismiss()
                this.toast.present({
                  message:'Producto actualizado en el carrito!',
                  duration:'2000'
                })
              }, (err) => {
                this.load.dismiss()
                console.log(err)
              })
            } else if(data.qu == 0){
              this.cartProvider.delete(d.productId).then((res)=>{
                this.load.dismiss()
                this.toast.present({
                  message:'Producto borrado del carrito!',
                  duration:'2000'
                })
              }, err=>{
                this.load.dismiss()
              })
            }else{
              this.load.dismiss()
              this.toast.present({
                message:'No hay suficientes unidades en existencia',
                duration:'2000'
              })
              console.log("Not Enough")
            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteCartProd(i){
    let prodId = this.cartCh.getByIndex(i).id
    this.load.present();
    this.cartProvider.delete(prodId).then((res)=>{
      this.load.dismiss()
      this.toast.present({
        message: 'Producto eliminado del carrito!',
        duration: '2000'
      })
      console.log(res)
    },(err)=>{
      this.load.dismiss()
      console.log(err)
    })
  }

  checkout(){
    this.load.present();
    this.cartProvider.checkout().then( res =>{
      this.load.dismiss()
      this.toast.present({
        message:'Compra realizada exitosamente!',
        duration:'2000'
      })
      console.log(res)
    }).catch(err=>{
      this.load.dismiss()
      let p = this.getProducts(err.error.errors)
      let m = this.productsToString(p);
      this.showNotAvailable(m)
    })
  }

  getProducts(arr){
    let result = [];
    arr.forEach(element => {
      if(!element.available){
        result.push(this.prodCh.findById(element.id).name)
      }
    });

    return result;
  }

  productsToString(arr){
    let str = '';

    arr.forEach(element => {
      str+="<br>* "+element
    });

    return str;
  }

  showNotAvailable(msg){
      let alert = this.alertCtrl.create({
        title: 'Algunos productos ya no estan disponibles:',
        subTitle: msg,
        buttons: ['Ok']
      });
      alert.present();
    }

  }
