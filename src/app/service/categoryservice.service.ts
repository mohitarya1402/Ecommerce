import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProductCategory } from '../../model/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryserviceService {
  constructor(private http: HttpClient) { }
  categoryEvent = new EventEmitter<boolean>();
  baseUrl = 'https://ecommerce-68a32-default-rtdb.firebaseio.com/';
  addProductCategory(category: any): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}productCategory.json`,
      category
    );
  }
  addCategoryEvent(msg:boolean)
  {
    console.log("message is "+msg)
    this.categoryEvent.emit(msg)
  }
  getCategory()
  {
    return this.http
      .get<{ [id: string]: IProductCategory }[]>(
        `${this.baseUrl}productCategory.json`
      )
      .pipe(
        map((categories) => {
          let formattedCategories: IProductCategory[] = [];
          for (let id in categories) {
            formattedCategories.push({
              id,
              ...categories[id],
            } as unknown as IProductCategory);
          }

          return formattedCategories;
        })
      );
  }
//get category by ID
  getCategoryById(id:string)
  {
    return this.http.get(`${this.baseUrl}/productCategory/${id}.json`);
  }
  //Edit category 
  editCategory(category: IProductCategory, id: string)
  { 
    return this.http.put(`${this.baseUrl}/productCategory/${id}.json`,category);
  }
  //delete method
  deleteCategory(id:string)
  {
    return this.http.delete(`${this.baseUrl}/productCategory/${id}.json`)
  }
}
