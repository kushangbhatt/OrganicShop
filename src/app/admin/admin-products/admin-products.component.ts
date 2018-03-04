import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs/Observable';
import { Subscribe } from '@firebase/util/dist/esm/src/subscribe';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
//import { Product } from '../../models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[]; //contain all product in the databse
  //filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<any>;
  items: any[] = [];//include product on the current page
  itemCount: number;


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.products = products;

      this.initializeTable(products);
    });
   }


   private initializeTable(products){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0})
    .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
   }

    reloadItems(params){
      if(!this.tableResource) return;

      this.tableResource.query(params)
      .then(items => this.items = items);
    }


   filter(query: string){
     //console.log(query);
     let filteredProducts = (query) ? this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())):
     this.products;

     this.initializeTable(filteredProducts);
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }

  ngOnInit() {
  }

}
