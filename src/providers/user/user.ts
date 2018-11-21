import { GetConfigProvider } from './../get-config/get-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  baseUrl:any;

  constructor(public http: HttpClient, getConfig:GetConfigProvider) {
    console.log('Hello UserProvider Provider');
    this.baseUrl = getConfig.getURL();
  }

  login(data):any{
    return this.http.post<Response>(this.baseUrl+'person/login',data)
  }

  register(data):any{
    return this.http.post(this.baseUrl+'person',data)
  }

  edit(data, id): any {
    return this.http.put(`${this.baseUrl}person/${id}`, data);
  }

}
