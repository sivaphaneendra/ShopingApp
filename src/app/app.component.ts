import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { IProduct } from './Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private totalProducts:IProduct[] = [];
  list_products:IProduct[] = [];
  private slectedProducts: IProduct[];
  title:String = 'Shopping App';
  cart_count: number;
  loading: boolean;
  pageIndex: number;
  pageChunkSize: number = 10;
  valid:boolean = true;

  constructor(private _productService: ProductsService, private router: Router) { }

  ngOnInit(){
    this._productService.getProducts().subscribe((data: any) => {
      this.totalProducts = data; 
      this.list_products = data.slice(0, this.pageChunkSize); 
    });
    this.slectedProducts = [];
    this.cart_count= 0;
    this.loading = false;
    this.pageIndex = 1;
  }

  addCart = function(product) {
    for(let i=0; i<this.slectedProducts.length; i++) {
        if(this.slectedProducts[i].id == product.id){
          this.valid = false;
        }
    }
    if(this.valid){
      this.slectedProducts.push(product);
      this.cart_count = this.slectedProducts.length;
    } else {
      this.valid = true;
    }
  }

  onScroll = function() {
    console.log("scrolled down");
    this.loading = true;
    this.pageIndex += 1;
    this.list_products = this.totalProducts.slice(0, this.pageChunkSize*this.pageIndex);
    this.loading = false;
  }

  openCartDetails = function() {
    if(this.slectedProducts.length >0){
      var pIds:any = [];
      for(let i=0; i<this.slectedProducts.length; i++) {
        pIds.push(this.slectedProducts[i].id);
      }
      //console.log("cart pIds", pIds);
      //this.router.navigate(['cart']);
      this.router.navigate(['cart', JSON.stringify(pIds)]);
    }
  }
}