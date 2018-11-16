import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController} from 'ionic-angular';

/*
  Generated class for the ToasterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToasterProvider {

  public toast:any

  constructor(private toaster:ToastController) { }

  async present(config){
    try {
      await this.toast.dismiss();
    } catch(e) {}

    this.toast = await this.toaster.create(config)
    return await this.toast.present()
  }

  dismiss(){
    try {
      this.toast.dismiss();
    } catch(e) {}
  }
}