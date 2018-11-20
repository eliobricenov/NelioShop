import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductChangerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductChangerProvider {

  public products: any = [
    {
      id:'3',
      name:'Product 1',
      vendor: 'Nestor',
      price: '8000.bs',
      category: 'Sports',
      description: 'Very useful product',
      image: '',
      quantity: 5
    }
  ]

  constructor() {
    console.log('Hello ProductChangerProvider Provider');
  }

  findProduct(id){
    for(let i =0; i<this.products.length;i++){
      if(this.products[i].id == id)
      return i;
    }
    return -1
   }

   updateProd(d, i){
    let index = this.findProduct(i)
    this.products[index]=d;
   }

   deleteProd(i){
    let index = this.findProduct(i)
    this.products.splice(index, 1)
   }

   readProds(d){
     this.products = d;
   }

   createProd(d){
     this.products.push(d);
   }

   getByIndex(i){
     return this.products[i];
   }

}
