import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ISubcategory } from "src/model/ISubCategory";


@Injectable({
  providedIn: 'root',
})
export class subCategoryService {
  subCategoryEvent = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  baseUrl = 'https://ecommerce-68a32-default-rtdb.firebaseio.com/';

  getSubCategoryEvent(msg: boolean)
  {
    debugger
    this.subCategoryEvent.emit(msg)
  }
  //add sub category
  addSubCategory(subcategory: ISubcategory): Observable<{ subcategory: any }> {
    return this.http.post<{ subcategory: any }>(
      `${this.baseUrl}subCategory.json`,
      subcategory
    );
  }

  //get all subCategory
  getAllSubCategory() {
    // return this.http.get(`${this.baseUrl}subCategory.json`);
    return this.http
      .get<{ [id: string]: ISubcategory }[]>(`${this.baseUrl}subCategory.json`)
      .pipe(
        map((subcategory) => {
          let formattedSubCategories: ISubcategory[] = [];
          for (let id in subcategory) {
            formattedSubCategories.push({
              id,
              ...subcategory[id],
            } as unknown as ISubcategory);
          }
          return formattedSubCategories;
        })
      );
  }
  //get sub category by Id
  getSubCategoryById(id: string) {
    return this.http.get(`${this.baseUrl}/subCategory/${id}.json`);
  }
  //edit subcategory
  editSubCategory(subCategory: ISubcategory, id: string) {
    return this.http.put(`${this.baseUrl}/subCategory/${id}.json`, subCategory);
  }
  //delete sub category
  deleteSubCategory(id: string) {
    return this.http.delete(`${this.baseUrl}/subCategory/${id}.json`);
  }
}


