import { GetConfigProvider } from './../../providers/get-config/get-config';
import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {LoadingController} from 'ionic-angular';


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

  imageURI:any;
  imageFileName:any;

  product:any = {
    id:'',
    name:'',
    description:'',
    categoryId:'',
    quantity:'',
    image:'',
    vendor:''
  }

  constructor(private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, 
    public mc:ModalController, public prodService:ProductsProvider, public gc:GetConfigProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  dismiss() {
    this.navCtrl.pop()
  }

  ionViewDidEnter(){
    
  }

  confirm(){
    if(this.product.id==''){
      this.prodService.create(this.product).then(
        (res:any)=>{
          console.log(res)
        }, (err)=>{
          console.log(err)
        })
    }else{
      this.prodService.update(this.product).then(
        (res:any)=>{
          console.log(res)
        }, (err)=>{
          console.log(err)
        })
    }
  }

  chooseImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
    }, (err) => {
      console.log(err);
      loader.dismiss();
    });
  }

}
