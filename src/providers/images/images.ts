import { Storage } from '@ionic/storage';
import { GetConfigProvider } from './../get-config/get-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  baseUrl: string;
  httpOptions: any
  token: any;


  constructor(private http: HttpClient, private storage: Storage,
     getConfig: GetConfigProvider) {
    console.log('Image Service called');
    this.baseUrl = getConfig.getURL() + "product/";
    this.token = undefined;
  }

  create(data2) {
    let data = {
      image: data2
    };
    return this.setUp(next => {
      this.http.post(this.baseUrl, data, this.httpOptions).subscribe((res: any) => {
        next(res);
      });
    })
  }

  setUp(callback) {
    return new Promise((next, error) => {
      this.getToken()
        .then(token => {
          this.token = token;
          this.httpOptions = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
          callback(next);
        })
        .catch(err => { console.log(err) })
    });

  }

  getToken() {
    return new Promise((res, rej) => {
      this.storage.get('token')
        .then(token => {
          if (token === null || token === 'undefined') {
            rej('Token is null')
          } else {
            res(token);
          }
        })
        .catch(err => rej(err))
    })
  }

}
