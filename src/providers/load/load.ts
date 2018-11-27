import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadProvider {

  public loader:any;

  constructor(public loadingCtrl:LoadingController) {
    console.log('Hello LoadProvider Provider');
  }

  async present(){
    try {
      await this.loader.dismiss();
    } catch(e) {}

    this.loader = await this.loadingCtrl.create({
      content: 'Cargando...'
    })
    return await this.loader.present()
  }

  dismiss(){
    try {
      this.loader.dismiss();
    } catch(e) {}
  }

}
