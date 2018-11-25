
import { ProductDetailPageModule } from './../pages/product-detail/product-detail.module';
import { AddProductPageModule } from './../pages/add-product/add-product.module';
import { SearchPageModule } from './../pages/search/search.module';
import { MyProductsPageModule } from './../pages/my-products/my-products.module';
import { MyCartPageModule } from './../pages/my-cart/my-cart.module';
import { ComponentsModule } from './../components/components.module';
import { LoginPageModule } from './../pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { GetConfigProvider } from '../providers/get-config/get-config';
import { UserProvider } from '../providers/user/user';
import { ToasterProvider } from '../providers/toaster/toaster';
import { HttpClientModule } from '@angular/common/http';
import { MenuChangerProvider } from '../providers/menu-changer/menu-changer';
import { ProductsProvider } from '../providers/products/products';
import { ProductChangerProvider } from '../providers/product-changer/product-changer';
import { CartProvider } from '../providers/cart/cart';
import { CartChangerProvider } from '../providers/cart-changer/cart-changer';
import { ProfilePage } from '../pages/profile/profile';
import { StorageProvider } from '../providers/storage/storage';
import { Camera } from '@ionic-native/camera';
import { FileUploadOptions, FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SeeProfilePage } from '../pages/see-profile/see-profile';
import { ModifyProfilePage } from '../pages/modify-profile/modify-profile';
import { ImagesProvider } from '../providers/images/images';
import { HomePageModule } from '../pages/home/home.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ProfilePage,
    SeeProfilePage,
    ModifyProfilePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    MyCartPageModule,
    MyProductsPageModule,
    SearchPageModule,
    SignUpPageModule,
    ProductDetailPageModule,
    AddProductPageModule,
    HomePageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ProfilePage,
    SeeProfilePage,
    ModifyProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetConfigProvider,
    UserProvider,
    ToasterProvider,
    MenuChangerProvider,
    ProductsProvider,
    ProductChangerProvider,
    CartProvider,
    CartChangerProvider,
    StorageProvider,
    StatusBar,
  FileTransfer,
  File,
  Camera,
    ImagesProvider
  ]
})
export class AppModule {}
