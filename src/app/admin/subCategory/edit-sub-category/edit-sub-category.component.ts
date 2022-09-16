import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { IProductCategory } from 'src/model/ICategory';
import { ISubcategory } from 'src/model/ISubCategory';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css'],
})
export class EditSubCategoryComponent implements OnInit {
  id: string = '';
  subCategory: any;
  categories: IProductCategory[] = [];
  subCategoryeditingFrom: FormGroup = new FormGroup({
    categoryName: new FormControl(''),
    subCategory: new FormControl(''),
    subCategoryStatus: new FormControl(''),
    timeAndDate: new FormControl(''),
  });
  constructor(
    private activateRoute: ActivatedRoute,
    private subcategoryService: subCategoryService,
    private categoryService: CategoryserviceService,
    private toastr: ToastrService,
    private routr: Router
  ) {}
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getCategories();
    this.subcategoryService
      .getSubCategoryById(this.id)
      .subscribe(async (subcategory) => {
        console.log(subcategory);
        this.subCategory = subcategory;
        this.subCategoryeditingFrom.setValue({
          categoryName: this.subCategory.categoryName,
          subCategory: this.subCategory.subCategory,
          subCategoryStatus: this.subCategory.subCategoryStatus,
          timeAndDate: this.subCategory.timeAndDate,
        });
      });
    let time = new Date();
    let timeString: any = <unknown>time.toLocaleString();
    this.subCategoryeditingFrom.patchValue({
      timeAndDate: timeString,
    });
  }
  getCategories() {
    this.categoryService.getCategory().subscribe((category) => {
      this.categories = category;
    });
  }
  onClickUpdateSubCategory() {
    let updatedValue = this.subCategoryeditingFrom.value;
    this.subcategoryService
      .editSubCategory(updatedValue as ISubcategory, this.id)
      .subscribe((data) => {
        this.toastr.success('Sub Category Updated Successfully');
        this.routr.navigate(['/subCategory']);
      });
  }
}
