import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy{
  products: any[] = [];
  filterProducts: any[] = [];
  subscription: Subscription;
  category;


  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
    ) { 

    this.subscription = productService.getAll().subscribe(product => {
      this.products = product;

      
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filterProducts = (this.category) ? 
        this.products.filter(p => p.value.category == this.category) :
        this.products;
    });

    }); 

  }

  addToCart(p){
    this.cartService.addToCart(p);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  //prod: Product;

  ngOnInit(){

  }

}
