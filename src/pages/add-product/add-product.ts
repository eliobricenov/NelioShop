import { ToasterProvider } from './../../providers/toaster/toaster';
import { LoadProvider } from './../../providers/load/load';
import { ImagesProvider } from './../../providers/images/images';
import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  imageURI: any;
  imageFileName: any;

  product: any = {
    id: '',
    name: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
    image: '',
    vendor: '',
    updateImage: false
  }


  constructor(private transfer: FileTransfer,
    private camera: Camera,
    public navCtrl: NavController, public navParams: NavParams,
    public mc: ModalController, public prodService: ProductsProvider,
    public actionSheetCtrl: ActionSheetController, public imageProvider: ImagesProvider,
  public loader:LoadProvider, public toast:ToasterProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  dismiss() {
    this.navCtrl.pop()
  }

  ionViewDidEnter() {
    if (this.navParams.get('edit')) {
      let p = this.navParams.get('product');
      this.product = p;
      this.imageFileName = p.image
    }
  }

  confirm(){

    this.loader.present()
    
    if (!this.navParams.get('edit')) {
      this.prodService.create(this.product).then(
        (res: any) => {
          this.loader.dismiss()
          this.toast.present({
            content: 'Publicación creada!',
            duration: 2000
          })
          this.navCtrl.pop()
          console.log(res)
        }, (err) => {
          this.loader.dismiss()
          this.toast.present({
            content: err,
            duration: 2000
          })
          console.log(err)
        })
    } else {
      this.prodService.update(this.product).then(
        (res: any) => {
          this.loader.dismiss()
          this.toast.present({
            content: 'Publicación actualizada!',
            duration: 2000
          })
          this.navCtrl.pop()
          console.log(res)
        }, (err) => {
          this.loader.dismiss()
          this.toast.present({
            content: err,
            duration: 2000
          })
          console.log(err)
        })
    }
  }

  takeImage() {
    console.log("getting image")
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    console.log(options);

    this.camera.getPicture(options).then((imageData) => {
      this.product.updateImage = true;
      console.log("GOT IT")
      console.log(imageData)
      this.imageFileName = 'data:image/jpeg;base64,' + imageData;
      this.product.image = this.imageFileName;
      console.log(this.imageFileName)
    }, (err) => {
      console.log(err);
    });
  }

  chooseImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.product.updateImage = true;
      this.imageFileName = 'data:image/jpeg;base64,' + imageData;
      this.product.image = this.imageFileName;
    }, (err) => {
      // Handle errory
    });
  }

  actionPresent() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.takeImage();
          }
        },
        {
          text: 'Escoger de la Galería',
          handler: () => {
            this.chooseImage()
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



}
