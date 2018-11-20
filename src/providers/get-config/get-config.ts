import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetConfigProvider {

  baseUrl:any = "http://10.240.130.156:8000/"

  constructor(public http: HttpClient) {
    console.log('Hello GetConfigProvider Provider');
  }

  getURL(){
    return this.baseUrl;
  }

}
