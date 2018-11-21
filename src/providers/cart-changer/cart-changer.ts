import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartChangerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartChangerProvider {

  public cart: any = []

  constructor() {
    console.log('Hello CartChangerProvider Provider');
  }

  findCart(id){
    for(let i =0; i<this.cart.length;i++){
      if(this.cart[i].id == id)
      return i;
    }
    return -1
   }

   updateCartProd(i, d){
    let index = this.findCart(i)
    this.cart[index].quantity=d;
   }

   deleteCartProd(i){
    let index = this.findCart(i)
    this.cart.splice(index, 1)
   }

   readCartProds(d){
     this.cart = d;
   }

   createCartProd(d){
     this.cart.push(d);
   }

   getByIndex(i){
     return this.cart[i];
   }
}
