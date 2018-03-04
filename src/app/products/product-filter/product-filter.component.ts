import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from '../../category.service';
import { Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy {

  categories: any[];
  subscription: Subscription;
  @Input('category') category;

  constructor(categoryService: CategoryService) { 
    this.subscription = categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
