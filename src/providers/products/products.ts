import { ProductChangerProvider } from './../product-changer/product-changer';
import { Storage } from '@ionic/storage';
import { GetConfigProvider } from './../get-config/get-config';
import { HttpClient } from '@angular/common/http';
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
  

  constructor(private http: HttpClient, private storage: Storage, getConfig:GetConfigProvider, public prodCh:ProductChangerProvider) {
    console.log('Product Service called');
    this.baseUrl = getConfig.getURL() + "product";
  }

  create(data) {
    return this.setUp(next => {
      this.http.post(this.baseUrl, data, this.httpOptions).subscribe( (res:any) => {
        this.prodCh.createProd(res.data);
        next(res);
      });
    })
  }

  update(data) {
    return this.setUp(next => {
     this.http.put(this.baseUrl+"/"+data.id+"/", data, this.httpOptions).subscribe( (res:any) => {
      this.prodCh.updateProd(data,res.data.id);
      next(res.data)
      } );
    });
  }

  delete(data) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + "/" + data.id + "/", this.httpOptions).subscribe((res: any) => {
        this.prodCh.deleteProd(data.id)
        next(res)
      });
    })
  }

  read() {
    this.setUp(next => {
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        console.log(res);
        this.prodCh.readProds(res.data);
      });
    })
  }

  getByName(name){
    this.setUp(next => {
      this.http.get(this.baseUrl+"/name/"+name+"/", this.httpOptions).subscribe((res: any) => {
        this.prodCh.readProds(res.data);
      });
    })
  }

  getByCategory(cat){
    this.setUp(next => {
      this.http.get(this.baseUrl+"/category/"+cat+"/", this.httpOptions).subscribe((res: any) => {
        this.prodCh.readProds(res.data);
      });
    })
  }

  getMyProducts(){
    this.setUp(next => {
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        this.prodCh.readProds(res.data);
      });
    })
  }

  setUp(callback) {
    return new Promise((next, error) => {
      if (this.token) {
        return callback(next);
      }

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