import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../Product';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartProducts: IProduct[];
  private totalProducts:IProduct[] = [];

  constructor(private _productService: ProductsService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.loadCart(params.pIds));
  }  

  ngOnInit() {
    this._productService.getProducts().subscribe((data: any) => {
      this.totalProducts = data;
      this.cartProducts = data.slice(0, 2); 
    });
  }

  loadCart = function(pIds){
    console.log(JSON.parse(pIds));
  }

  delete = function(product) {
    this.cartProducts = this.cartProducts.slice(0,1);
  }

}
