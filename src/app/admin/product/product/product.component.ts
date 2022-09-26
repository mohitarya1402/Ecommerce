import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { productService } from 'src/app/service/productService';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { IProductCategory } from 'src/model/ICategory';
import { IProduct } from 'src/model/IProduct';
import { ISubcategory } from 'src/model/ISubCategory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: productService,
    private categoryService: CategoryserviceService,
    private subcategoryService: subCategoryService,
    private toastr:ToastrService
  ) {}
  productsArray: any = [];
  categoryArray: IProductCategory[] = [];
  subcategoryArray: ISubcategory[] = [];
  formattedProductArray: IProduct[] = [];
  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getSubCategory();
    // setTimeout(this.getFormattedProduct,3000)
    // this.getFormattedProduct()
  }
  getProduct() {
    this.productService.getProduct().subscribe((data) => {
      this.formattedProductArray = data;
      // console.log(data[0]);
    });
  }
  getSubCategory() {
    this.subcategoryService.getAllSubCategory().subscribe((data) => {
      this.subcategoryArray = data;
      // console.log('sub category');
      // console.log(this.subcategoryArray);
    });
  }
  //get Category
  getCategory() {
    this.categoryService.getCategory().subscribe((categories) => {
      this.categoryArray = categories;
      // console.log('category');
      // console.log(this.categoryArray);
    });
  }
  //delete product
  onClickDeleteProduct(id:string)
  {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.toastr.success("Product Deleted Successfully")
        this.getProduct();
  })
  }


}
