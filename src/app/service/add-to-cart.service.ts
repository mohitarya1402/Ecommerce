import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICart } from 'src/model/ICart';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  baseUrl = 'https://ecommerce-68a32-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}
  public cartQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public needRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  addToCart(cart: ICart) {
    return this.http.post(`${this.baseUrl}addToCart.json`, cart);
  }

  getThecartproduct(): Observable<ICart[]> {
    return this.http
      .get<{ [id: string]: ICart }[]>(`${this.baseUrl}addToCart.json`)
      .pipe(
        map((categories) => {
          let formattedCategories: ICart[] = [];
          for (let id in categories) {
            formattedCategories.push({
              id,
              ...categories[id],
              // userId: categories,
            } as unknown as ICart);
          }
          return formattedCategories;
        })
      );
  }
  //
  getProductById(id: string) {
    return this.http.get<{ [id: string]: ICart }[]>(
      `${this.baseUrl}/addToCart/${id}.json`
    );
    // .pipe(
    //   map((categories) => {
    //     let formattedCategories: ICart[] = [];
    //     for (let id in categories) {
    //       formattedCategories.push({
    //         id,
    //         ...categories[id],
    //         // userId: categories,
    //       } as unknown as ICart);
    //     }
    //     return formattedCategories;
    //   })
    // );
  }
  //Edit category
  editCart(category: ICart, id: string) {
    return this.http.put(`${this.baseUrl}/addToCart/${id}.json`, category);
  }
  getcartQuantity(value: number) {
    return this.cartQuantity.next(value);
  }
  needRefreshMethod(val: boolean) {
    return this.needRefresh.next(val);
  }
}
