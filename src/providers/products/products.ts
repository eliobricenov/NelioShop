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
  public products: any;

  constructor(private http: HttpClient, private storage: Storage, getConfig:GetConfigProvider) {
    console.log('Note Service called');
    this.baseUrl = getConfig.getURL() + "note";
  }

  create(data) {
    return this.setUp(next => {
      this.http.post(this.baseUrl, data, this.httpOptions).subscribe( (res:any) => {
        console.log(res)
        this.products.push( res.data );
        console.log(this.products)
        next(res);
      });
    })
  }

  update(data) {
    return this.setUp(next => {
     this.http.put(this.baseUrl+"/"+data.id+"/", data, this.httpOptions).subscribe( (res:any) => {
      let index = this.findCard(res.data.id)
      this.products[index]=data;
      console.log(this.products[index],data)
      console.log(res)
      next(res.data)
      } );
    });
  }

  delete(data) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + "/" + data.id + "/", this.httpOptions).subscribe((res: any) => {
        let index = this.findCard(data.id)
        this.products.splice(index, 1)
        next(res)
      });
    })
  }

  read() {
    this.setUp(next => {
      this.http.get(this.baseUrl, this.httpOptions).subscribe((res: any) => {
        this.products = res.data;
        console.log(this.products)
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

  findCard(id){
   for(let i =0; i<this.products.length;i++){
     if(this.products[i].id == id)
     return i;
   }
   return -1
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
