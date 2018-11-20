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
import { ProfilePage } from '../pages/profile/profile';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetConfigProvider,
    UserProvider,
    ToasterProvider,
    MenuChangerProvider,
    StorageProvider
  ]
})
export class AppModule {}
