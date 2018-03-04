import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/Observable';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { Product } from './models/product';

@Injectable()
export class ShoppingCartService {

  

  constructor(private db: AngularFireDatabase) { }

   private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  getShoppingCarts(){
    let carts  =  this.db.list('/shopping-carts');
    //console.log(carts);

    return carts;
    
  }

  getShoppingCartsByKey(key){
    let cart =  this.db.list('/shopping-carts/' + key);
    //console.log(key + cart);

    return cart;
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId= localStorage.getItem('cartId');
    if(!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key); 
      return result.key;
    }else{
      return cartId;
    }
  }

  async addToCart(p){
    let cartId = await this.getOrCreateCartId();
    var quantity = 0;
    var key = p.$key;
    delete(p.$key);
      
      let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + key);
      //console.log(p.$key);
      item$.update({product: p, quantity: quantity +  1});
    
  }

}
