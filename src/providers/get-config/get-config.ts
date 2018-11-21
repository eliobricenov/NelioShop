import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetConfigProvider {

<<<<<<< HEAD
  baseUrl:any = "http://10.240.130.157:8000/"
=======
  baseUrl:any = "http://192.168.43.205:8000/"
>>>>>>> 5a32d150d0076701ef8034a4359e0043b642e5e4

  constructor(public http: HttpClient) {
    console.log('Hello GetConfigProvider Provider');
  }

  getURL(){
    return this.baseUrl;
  }

}
