import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private _productsUrl = '/assets/data/products.json';
  
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
      return this._http.get<IProduct[]>(this._productsUrl);
  }
}
