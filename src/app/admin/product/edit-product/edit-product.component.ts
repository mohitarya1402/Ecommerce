import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { type } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { productService } from 'src/app/service/productService';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { ImageUploadService } from 'src/app/service/uploadService';
import { IProductCategory } from 'src/model/ICategory';
import { IProduct } from 'src/model/IProduct';
import { ISubcategory } from 'src/model/ISubCategory';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id: string = '';
  productArray: IProduct[] = [];
  
  formattedproductArray:IProduct[] = []
  categoryArray: IProductCategory[] = [];
  subCategoryArray: ISubcategory[] = [];
  filteredSubCategory: ISubcategory[] = [];
  constructor(
    private uploadService: ImageUploadService,
    private toastr: ToastrService,
    private activaterouter: ActivatedRoute,
    private productService: productService,
    private categoryService: CategoryserviceService,
    private subcategoryService: subCategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.activaterouter.snapshot.params['id'];
    // this.getProductById(this.id);
  }
  //form name
  editProductForm = new FormGroup({
    productName: new FormControl(''),
    category: new FormControl(''),
    subCategory: new FormControl(''),
    belongsTo: new FormControl(''),
    brandName: new FormControl(''),
    price: new FormControl(''),
    materialType: new FormControl(''),
    fitType: new FormControl(''),
    // imageURL: new FormControl(''),
    printPatternType: new FormControl(''),
    color: new FormControl(''),
    // size: new FormArray([]),
  });

    //set value in form 
  setValueInForm()
  {

  }
  public file: any = {};

  //Add Image
  selectFile(event: any) {
    this.file = event.target.files[0];
  }
  //add product image url to product details
  addImage() {
    this.uploadService
      .uploadImage(this.file, this.file.name)
      .subscribe((data) => {
        // console.log(data);
        this.editProductForm.patchValue({
          // imageURL: data,
        });
        this.toastr.success('photo uploaded successfully');
      });
  }
  belongs:any
  // // //get product by Id
  getProductById(id: string) {

  }
  //get category
  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryArray = data;
    });
  }

  //get Filtered Sub Category
  onCategorySelect(event: Event) {
    let selectedItem = (event.target as HTMLSelectElement).value;
    this.subcategoryService.getAllSubCategory().subscribe((data) => {
      this.filteredSubCategory = data.filter((item) => {
        return item.categoryName == selectedItem;
      });
    });
  }
  //dynamic add input box
  OnClickAddSize() {
    const control = new FormControl(null);
    (<FormArray>(<unknown>this.editProductForm.get('size'))).push(control);
  }
  //
  // get SizeControls() {
  //   return (<FormArray>this.editProductForm.get('size')).controls;
  // }

  editProduct() {}
}
