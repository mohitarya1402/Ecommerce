import { Component, Input, OnInit } from '@angular/core';

import { IProductCategory } from 'src/model/ICategory';
import { IProduct } from 'src/model/IProduct';
import { ISubcategory } from 'src/model/ISubCategory';
import { CategoryserviceService } from '../service/categoryservice.service';
import { productService } from '../service/productService';
import { subCategoryService } from '../service/subCategoryService';
import { GlobalSearchService } from '../service/searchDataPassService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  priceArray: any = [
    { min: 0, max: 499 },
    { min: 500, max: 999 },
    { min: 1000, max: 1499 },
    { min: 1500, max: 1999 },
    { min: 2000, max: 2499 },
    { min: 3000, max: 2999 },
  ];
  productArray: IProduct[] = [];
  formedProductArray: IProduct[] = [];
  filteredArray: any = [];
  categories: IProductCategory[] = [];
  subcategoriesArray: ISubcategory[] = [];
  selectedSubcategory: string = '';
  filteredSubCategoryArray: ISubcategory[] = [];
  formedSubCategoriesArray: ISubcategory[] = [];
  value: string = '';
  // valueA!:number
  // searchText: string = '';
  @Input() keyword: string = '';
  constructor(
    private productService: productService,
    private categoryService: CategoryserviceService,
    private subcategoryService: subCategoryService,
    private dataservice: GlobalSearchService,
    private router: Router
  ) {}

  filtersubcategory: any = '';
  searchTerm: string = '';
  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.searchItemText();
    this.formProductArray();
    this.formedSubCategory();
    this.filteredArray = this.formedProductArray;
  }

  getProduct() {
    this.productService.getProduct().subscribe((data) => {
      this.productArray = data;
      // this.filteredArray = data;
    });
  }

  allAndBelongsSelect(event: any) {
    let inputValue = (event.target as HTMLInputElement).value;
    console.log(inputValue);
    if (inputValue.toLowerCase() != 'All'.toLowerCase()) {
      this.filteredArray = this.productArray.filter((data) => {
        return data.belongsTo.toLowerCase() == inputValue.toLowerCase();
      });
    } else {
      this.filteredArray = this.productArray;
    }
  }

  //get Category
  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
  //on category select show products
  onCategorySelect(event: Event) {
    let selectedItem: string = (event.target as HTMLSelectElement).value;
    this.filteredArray = this.formedProductArray.filter((data) => {
      return data.category == selectedItem;
    });
    this.filteredSubCategoryArray = this.formedSubCategoriesArray.filter(
      (subcat) => {
        return subcat.categoryName == selectedItem;
      }
    );
  }

  onSelectFilterProduct(event: Event) {
    let selectedValue: string = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    this.productService.getProduct().subscribe((data) => {
      console.log(this.formedProductArray);
      this.filteredArray = this.formedProductArray.filter((item) => {
        return item.subCategory.toLowerCase() == selectedValue.toLowerCase();
      });
    });
  }

  //search
  searchItemText() {
    this.dataservice.searchTerm.subscribe((newValue: string) => {
      this.searchTerm = newValue;
      console.log(this.searchTerm);
    });
  }

  formProductArray() {
    this.categoryService.getCategory().subscribe((categories) => {
      this.subcategoryService.getAllSubCategory().subscribe((subcategories) => {
        this.productService.getProduct().subscribe((products) => {
          for (let product of products) {
            let category = categories.find((cat) => cat.id == product.category);
            let subcategory = subcategories.find(
              (subCat) =>
                subCat.id == product.subCategory &&
                subCat.categoryName == product.category
            );
            this.formedProductArray.push({
              ...product,
              category: category?.category ?? '',
              subCategory: subcategory?.subCategory ?? '',
            });
          }
        });
      });
    });
  }

  //form subCategory
  formedSubCategory() {
    this.categoryService.getCategory().subscribe((categories) => {
      this.subcategoryService.getAllSubCategory().subscribe((subcategories) => {
        for (let subCategory of subcategories) {
          let category = categories.find(
            (cat) => subCategory.categoryName == cat.id
          );
          this.formedSubCategoriesArray.push({
            ...subCategory,
            categoryName: category?.category ?? '',
          });
        }
      });
    });
  }
  onClickNavigate(id: string) {
    console.log('id is printing');
    console.log(id);
    this.router.navigate(['viewProduct', id]);
    let url = 'viewProduct/' + id;
    console.log('url ' + url);
    // window.open(url, '_blank');
  }
}
