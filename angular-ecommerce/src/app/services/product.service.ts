import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Product} from "../common/product";


// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  //Return an observable, map the JSON data from Spring Data Rest to product array
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }


}
