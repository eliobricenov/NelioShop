import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToasterProvider } from '../../providers/toaster/toaster';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public userProvider: UserProvider, public storage: Storage, public toast: ToasterProvider) {
    menuCtrl.swipeEnable(false)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(e, p) {
    this.toast.present({
      message: 'Procesando...'
    });

    let data = {
      email: e,
      password: p
    }

    this.userProvider.login(data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toast.dismiss()
          this.storage.set('userData', res.data)
          this.storage.set('token', res.token);
          this.navCtrl.goToRoot({})
        }
      },
      (err: any) => {
        if (err.status == 403 || err.status == 404) {
          this.toast.present({
            message: 'Combinación Usuario/Contraseña incorrecta',
            duration: 2000
          })
        } else if (err.status == 400) {
          this.toast.present({
            message: 'E-mail o contraseña inválida',
            duration: 2000
          })
        }
      }
    )
  }

  gotoRegister(): void {
    this.navCtrl.push('SignUpPage');
  }

}
