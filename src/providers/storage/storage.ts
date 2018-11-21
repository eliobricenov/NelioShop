import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  public getToken(): Promise<any> {
    return new Promise((res, rej) => {
      this.storage.get('token')
        .then(token => {
          if (token === null || token === 'undefined') {
            console.log('Token is null');
            rej('Token is null')
          } else {
            res(token);
          }
        })
        .catch(err => rej(err))
    })
  }

  public getData(): Promise<any> {
    return new Promise((res, rej) => {
      this.storage.get('userData')
        .then(data => {
          if (data === null || data === 'undefined') {
            console.log('data is null');
            rej('data is null')
          } else {
            res(data);
          }
        })
        .catch(err => rej(err))
    })
  }

}
