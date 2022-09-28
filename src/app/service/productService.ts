import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { data } from "jquery";
import { map, Observable } from "rxjs";
import { IProduct } from "src/model/IProduct";

@Injectable({
  providedIn: 'root',
})
export class productService {
  constructor(private http: HttpClient) {}
  categoryEvent = new EventEmitter<boolean>();
  baseUrl = 'https://ecommerce-68a32-default-rtdb.firebaseio.com/';
  addProduct(category: any): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}products.json`,
      category
    );
    }
    //add products
  addProductEvent(msg: boolean) {
    console.log('message is ' + msg);
    this.categoryEvent.emit(msg);
    }
    // get products
  getProduct() {
    return this.http
      .get<{ [id: string]: IProduct }[]>(`${this.baseUrl}products.json`)
      .pipe(
        map((data) => {
          let formattedCategories: IProduct[] = [];
          for (let id in data) {
            formattedCategories.push({
            id,
            ...data[id],
            } as unknown as IProduct);
        }
        return formattedCategories;
        })
    );
  }
  //get products by ID
  getProductById(id: string) {
    // debugger
    // return this.http.get(`${this.baseUrl}/products/${id}.json`);
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}.json`)

  }
  //Edit products
  editProduct(category: IProduct, id: string) {
    return this.http.put(`${this.baseUrl}products/${id}.json`, category);
  }
  //delete products
  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}products/${id}.json`);
  }
}