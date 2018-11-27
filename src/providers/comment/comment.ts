import { CommentChangerProvider } from './../comment-changer/comment-changer';
import { GetConfigProvider } from './../get-config/get-config';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  baseUrl: string;
  httpOptions: any
  token: any;


  constructor(private http: HttpClient, private storage: Storage, public getConfig: GetConfigProvider, public commCh: CommentChangerProvider) {
    console.log('Comment Service called');
    this.baseUrl = getConfig.getURL() + "commentary/";
    this.token = undefined;
  }

  create(data) {
    return this.setUp(next => {
      this.http.post(this.baseUrl, data, this.httpOptions).subscribe((res: any) => {
        this.commCh.createComm(res.data);
        next(res);
      });
    })
  }

  update(data) {
    return this.setUp(next => {
      this.http.put(this.baseUrl + data.id + "/", data, this.httpOptions).subscribe((res: any) => {
        this.commCh.updateComm(res.data.text, data.id, res.data.updated);
        next(res.data)
      });
    });
  }

  delete(id) {
    return this.setUp(next => {
      this.http.delete(this.baseUrl + id + "/", this.httpOptions).subscribe((res: any) => {
        this.commCh.deleteComm(id)
        next(res)
      });
    })
  }

  read(prodId) {
    this.setUp(next => {
      this.http.get(this.baseUrl+prodId, this.httpOptions).subscribe((res: any) => {
        console.log(res);
        this.commCh.readComms(res.data);
        console.log(res.data);
      }, (err) => {
        console.log(err)
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
