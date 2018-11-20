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
import { HomePage } from '../pages/home/home';
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

@NgModule({
  declarations: [
    MyApp,
    ListPage,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    MyCartPageModule,
    MyProductsPageModule,
    SearchPageModule,
    AddProductPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
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
    CartChangerProvider
  ]
})
export class AppModule {}
