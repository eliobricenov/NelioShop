
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MenuChangerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuChangerProvider {

<<<<<<< HEAD
  public user: any = {
=======
  public user:any = {
    id:'',
>>>>>>> 5a32d150d0076701ef8034a4359e0043b642e5e4
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  }

  constructor(public http: HttpClient) {
    console.log('Hello MenuChangerProvider Provider');
  }

  setUser(data) {
    this.user = data;
    console.log(this.user);
  }

}
