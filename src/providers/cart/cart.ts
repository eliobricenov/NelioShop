import { ProductsProvider } from './../products/products';
import { ProductChangerProvider } from './../product-changer/product-changer';
import { LoadProvider } from './../load/load';
import { CartChangerProvider } from './../cart-changer/cart-changer';
import { GetConfigProvider } from './../get-config/get-config';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterProvider } from '../toaster/toaster';

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
  

  constructor(private http: HttpClient, private storage: Storage, getConfig:GetConfigProvider, 
    private cartCh:CartChangerProvider, public toast:ToasterProvider, public load:LoadProvider,
  public prodCh:ProductChangerProvider, public prodProvider:ProductsProvider) {
    console.log('Cart Service called');
    this.baseUrl = getConfig.getURL() + "cart";
  }

  create(id, quantity) {
    let json = {
      productId: id,
      quantity: quantity
    }
    return this.setUp(next => {
      this.http.post(this.baseUrl, json, this.httpOptions).subscribe( (res:any) => {
        this.cartCh.createCartProd(id, quantity);
        next(res);
      });
    })
  }

  update(data) {
    return this.setUp(next => {
     this.http.put(this.baseUrl+"/"+data.id+"/", data, this.httpOptions).subscribe( (res:any) => {
      this.cartCh.updateCartProd(data.productId,data.quantity);
      next(res.data)
      } );
    });
  }

  delete(data) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + "/" + data+ "/", this.httpOptions).subscribe((res: any) => {
        this.cartCh.deleteCartProd(data)
        next(res)
      });
    })
  }

  read() {
    this.setUp(next => {
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        console.log("Da",res)
        this.cartCh.readCartProds(res.data);
      });
    })
  }

  checkout() {
    return this.setUp((next,reject) => {
      this.http.post(this.baseUrl+"/buy", [], this.httpOptions).subscribe( (res:any) => {
        this.cartCh.cart=[];
        this.cartCh.total=0;
        next(res);
      }, err =>{
        reject(err);
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
          callback(next,error);
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
