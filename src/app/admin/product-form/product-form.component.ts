import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Product } from '../../models/product';


//implement ActivatedRoute Service to read route parameters
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  prod: Product = {}; 
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    categoryService: CategoryService, private productService: ProductService) {

    this.categories$ = categoryService.getCategories().valueChanges();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.prod = p);
   }

   save(product){
     //console.log(product);
    // If we are updating product then we have already an id
    if(this.id) this.productService.update(this.id, this.prod);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
   }

   delete(){
     if(confirm('Are you sure you want to delete product?')){
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
     }
     else return;
   }
  ngOnInit() {
  }

}
