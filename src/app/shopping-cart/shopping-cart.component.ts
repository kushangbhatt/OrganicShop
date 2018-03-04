import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
//import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartItems } from '../models/shopping-cart-item';
import { of } from 'rxjs/observable/of';
//import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  //subscription: Subscription;
  allCarts: Observable<any[]>;
  items: any[] = [];

  prod: ShoppingCartItems[] = [];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(){
    this.cartService.getShoppingCarts().snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
          //console.log(action.key);
        this.allCarts = this.cartService.getShoppingCartsByKey(action.key).valueChanges();
        this.allCarts.subscribe(res => {
          console.log(res);
          res.forEach(element => {
            this.items.push(element);
            //console.log(this.items[1]);

            for(let p in this.items[1]){
              this.prod.push(this.items[1][p]);
              console.log(this.prod);
              //console.log(this.items[1][p].product.title);
          
              } 

          });
        });
      }); 
    });




  }


}
