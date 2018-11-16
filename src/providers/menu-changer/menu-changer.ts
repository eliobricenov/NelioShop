import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MenuChangerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuChangerProvider {

  public user = {
    username: 'namesty',
    firstName: 'Nestor',
    lastName: 'Amesty',
    email: 'nestor09amesty@gmail.com',
    img: '../assets/imgs/profile.png',
  }

  constructor(public http: HttpClient) {
    console.log('Hello MenuChangerProvider Provider');
  }

  setUser(data){
    this.user = data;
  }

}
