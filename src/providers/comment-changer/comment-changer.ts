import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommentChangerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentChangerProvider {

public comms:any = [];

  constructor(public http: HttpClient) {
    console.log('Hello CommentChangerProvider Provider');
  }

  findComm(id){
    for(let i =0; i<this.comms.length;i++){
      if(this.comms[i].id == id)
      return i;
    }
    return -1
   }

   updateComm(d, i, u){
    let index = this.findComm(i)
    this.comms[index].text=d;
    this.comms[index].updated = u;
   }

   deleteComm(i){
    let index = this.findComm(i)
    this.comms.splice(index, 1)
   }

   readComms(d){
     this.comms = d;
     console.log(this.comms)
   }

   createComm(d){
     this.comms.unshift(d);
   }

   getByIndex(i){
     return this.comms[i];
   }

}
