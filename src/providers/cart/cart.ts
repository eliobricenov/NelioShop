import { CartChangerProvider } from './../cart-changer/cart-changer';
import { GetConfigProvider } from './../get-config/get-config';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  baseUrl: string;
  httpOptions: any
  token: any;
  

  constructor(private http: HttpClient, private storage: Storage, getConfig:GetConfigProvider, private cartCh:CartChangerProvider) {
    console.log('Cart Service called');
    this.baseUrl = getConfig.getURL() + "cart";
  }

  create(id, quantity) {
    return this.setUp(next => {
      this.http.post(this.baseUrl, id, this.httpOptions).subscribe( (res:any) => {
        this.cartCh.createCartProd(res.data);
        next(res);
      });
    })
  }

  update(id, quantity) {
    return this.setUp(next => {
     this.http.put(this.baseUrl+"/"+id+"/", quantity, this.httpOptions).subscribe( (res:any) => {
      this.cartCh.updateCartProd(id,res.data.id);
      next(res.data)
      } );
    });
  }

  delete(data) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + "/" + data.id + "/", this.httpOptions).subscribe((res: any) => {
        this.cartCh.deleteCartProd(data.id)
        next(res)
      });
    })
  }

  read() {
    this.setUp(next => {
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        this.cartCh.readCartProds(res.data);
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
        .catch(err => {})
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
