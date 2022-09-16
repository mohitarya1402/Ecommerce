import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ImageUploadService } from 'src/app/service/uploadService';
import {  Storage } from '@angular/fire/storage';
import { IProduct } from 'src/model/IProduct';
import { FileUpload } from 'src/model/fileMetaData';
import { productService } from '../../../service/productService';
import { ToastrService } from 'ngx-toastr';
import { finalize, from, switchMap } from 'rxjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from 'firebase/storage';
import { Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { IProductCategory } from 'src/model/ICategory';
import { ISubcategory } from 'src/model/ISubCategory';
import { map } from 'jquery';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  percentage: number = 0;
  currentFileUpload!: FileUpload;
  categoryArray: IProductCategory[] = [];
  subCategoryArray: ISubcategory[] = [];
  filteredSubCategory: ISubcategory[] = [];
  selectedCategory!: string;
  constructor(
    private router: Router,
    public storage: Storage,
    private uploadService: ImageUploadService,
    private productService: productService,
    private toastr: ToastrService,
    private categoryService: CategoryserviceService,
    private subcategoryService: subCategoryService
  ) {}
  ngOnInit(): void {
    this.getCategory();
  }
  productSize!: any;
  public file: any = {};
  filteredData!: string;
  addProductForm = new FormGroup({
    productName: new FormControl(''),
    category: new FormControl(''),
    subCategory: new FormControl(''),
    belongsTo: new FormControl(''),
    brandName: new FormControl(''),
    price: new FormControl(''),
    materialType: new FormControl(''),
    fitType: new FormControl(''),
    imageURL: new FormControl(''),
    printPatternType: new FormControl(''),
    color: new FormControl(''),
    size: new FormArray([]),
  });

  get SizeControls() {
    return (<FormArray>this.addProductForm.get('size')).controls;
  }
  get colorControls() {
    return (<FormArray>(<unknown>this.addProductForm.get('color'))).controls;
  }

  OnClickAddSize() {
    const control = new FormControl(null);
    (<FormArray>(<unknown>this.addProductForm.get('size'))).push(control);
  }
  //send product details to product service
  addProductToDatabase() {
    let product = this.addProductForm.value;
    this.productService.addProduct(product).subscribe((data) => {
      this.toastr.success('Product Added Successfully');
      console.log(this.addProductForm.value);
      this.router.navigate(['/product']);
    });
  }

  //upload image
  selectFile(event: any) {
    this.file = event.target.files[0];
  }
  //add product image url to product details
  addImage() {
    this.uploadService
      .uploadImage(this.file, this.file.name)
      .subscribe((data) => {
        console.log(data);
        this.addProductForm.patchValue({
          imageURL: data,
        });
        this.toastr.success('photo uploaded successfully');
      });
  }
  //get Category
  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryArray = data;
    });
  }
  onCategorySelect(event: Event) {
    let selectedItem = (event.target as HTMLSelectElement).value;
    this.subcategoryService.getAllSubCategory().subscribe((data) => {
      this.filteredSubCategory = data.filter((item) => {
        return item.categoryName == selectedItem;
  })
  })

  }
}
