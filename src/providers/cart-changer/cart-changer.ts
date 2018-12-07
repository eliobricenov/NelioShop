import { ProductChangerProvider } from './../product-changer/product-changer';
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
  public total:any = 0;

  constructor( public prodCh:ProductChangerProvider) {
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
    console.log(index)
    this.cart[index].added=d;
    this.updateTotal();
   }

   deleteCartProd(i){
    let index = this.findCart(i)
    this.cart.splice(index, 1)
    this.updateTotal();
   }

   readCartProds(arr){
     this.cart = [];
     arr.forEach(element => {
       console.log(element);
       let foundProduct = this.prodCh.findById(element.productId);
       let temp = this.cloneProduct(foundProduct);
       temp['added'] = element.quantity;
       this.cart.push(temp);
     });
     this.updateTotal();
   }

   createCartProd(i, q){
     console.log(i,q)
    let newProd = true;
    this.cart.forEach(element => {
      if(element.id == i){
        element.added+=q
        newProd = false;
      }
    });
    if(newProd){
      let foundProduct = this.prodCh.findById(i);
        let temp = this.cloneProduct(foundProduct);
        temp['added'] = q;
        console.log('yes',temp)
        this.cart.push(temp);
    }

    this.updateTotal();

   }

   getByIndex(i){
     return this.cart[i];
   }

   updateTotal(){
     this.total = 0;
     this.cart.forEach(element => {
       let productPrice = element.price;
       let productQuantity = element.added;
       this.total += productPrice * productQuantity;
       console.log(productPrice,productQuantity,this.total);
     });
   }

   cloneProduct(p){
     console.log(p)
    let temp = {
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price,
      quantity: p.quantity,
      image: {
        id: p.image.id,
        name: p.image.name,
        url: p.image.url,
      }
   }

   return temp;
  }
}
