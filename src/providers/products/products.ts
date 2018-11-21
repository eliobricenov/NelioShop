import { MenuChangerProvider } from './../menu-changer/menu-changer';
import { ProductChangerProvider } from './../product-changer/product-changer';
import { Storage } from '@ionic/storage';
import { GetConfigProvider } from './../get-config/get-config';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../../pages/login/login';

import { Injectable } from '@angular/core';
/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  baseUrl: string;
  httpOptions: any
  token: any;


  constructor(private http: HttpClient, private storage: Storage, public getConfig: GetConfigProvider, public prodCh: ProductChangerProvider) {
    console.log('Product Service called');
    this.baseUrl = getConfig.getURL() + "product/";
    this.token = undefined;
  }

  create(data) {
    return this.setUp(next => {
      this.http.post(this.baseUrl, data, this.httpOptions).subscribe((res: any) => {
        this.appendUrl(res.data)
        this.prodCh.createProd(res.data);
        next(res);
      });
    })
  }

  update(data) {
    return this.setUp(next => {
      this.http.put(this.baseUrl + data.id + "/", data, this.httpOptions).subscribe((res: any) => {
        this.appendUrl(data)
        this.prodCh.updateProd(data, res.data.id);
        next(res.data)
      });
    });
  }

  delete(id) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + id + "/", this.httpOptions).subscribe((res: any) => {
        this.prodCh.deleteProd(id)
        next(res)
      });
    })
  }

  read() {
    this.setUp(next => {

      console.log(this.token)
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        console.log(res);
        this.appendUrl(res.data)
        this.prodCh.readProds(res.data);
        console.log(res.data);
      }, (err) => {
        console.log(err)
      });
    })
  }

  getByName(name) {
    this.setUp(next => {
      this.http.get(this.baseUrl + "search?name=" + name, this.httpOptions).subscribe((res: any) => {
        this.appendUrl(res.data)
        this.prodCh.readProds(res.data);
      });
    })
  }

  getByCategory(cat) {
    this.setUp(next => {
      this.http.get(this.baseUrl + "category/" + cat + "/", this.httpOptions).subscribe((res: any) => {
        this.appendUrl(res.data)
        this.prodCh.readProds(res.data);
      });
    })
  }

  getMyProducts() {
    this.setUp(next => {
      console.log(this.token, this.httpOptions)
      this.http.get(this.baseUrl + "personal", this.httpOptions).subscribe((res: any) => {
        console.log(res.data)
        this.appendUrl(res.data)
        console.log(res.data)
        this.prodCh.readProds(res.data);
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

  appendUrl(arr){
    for(let i=0; i<arr.length;i++){
      arr[i].image = this.getConfig.getURL() + arr[i].image
    }
  }

}
