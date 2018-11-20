import { SearchPage } from './../pages/search/search';
import { MyProductsPage } from './../pages/my-products/my-products';
import { MyCartPage } from './../pages/my-cart/my-cart';
import { MenuChangerProvider } from './../providers/menu-changer/menu-changer';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{ title: string, component: any }>;
  user: any;
  @ViewChild('profile') profileImg: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public menuchange:MenuChangerProvider) {
    this.initializeApp();

    // TESTING
    /*this.menuchange.user = {
      username: 'namesty',
      firstName: 'Nestor',
      lastName: 'Amesty',
      email: 'namesty@cps.la'
    }

    this.storage.set('userData', this.menuchange.user).then((res:any)=>{console.log('done')})
*/
    //END TESTING
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Buscar', component: SearchPage},
      { title: 'Mi Carrito', component: MyCartPage },
      { title: 'Mis publicaciones', component: MyProductsPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  altImage(profile){

    console.log(this.profileImg)
    console.log(profile)

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  closeSession(){
    this.storage.clear().then((val:any)=>{
      this.nav.push("LoginPage")
    })
  }
}
