import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { IProductCategory } from 'src/model/ICategory';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css'],
})
export class AddSubCategoryComponent implements OnInit {
  categories: IProductCategory[] = [];
  constructor(
    public router: Router,
    private categoryService: CategoryserviceService,
    private subCategoryservice: subCategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
    let time = new Date();
    let timeString: any = <unknown>time.toLocaleString();
    this.subCategoryAddingFrom.patchValue({
      timeAndDate: timeString,
    });
  }
  subCategoryAddingFrom: FormGroup = new FormGroup({
    subCategory: new FormControl(''),
    categoryName: new FormControl(''),
    subCategoryStatus: new FormControl(''),
    timeAndDate: new FormControl(''),
  });

  onClickAddSubCategory() {
    let formValue = this.subCategoryAddingFrom.value;
    this.subCategoryservice.addSubCategory(formValue).subscribe((data) => {
      console.log(data);
      this.toastr.success("Sub Category Added Successfully")
      this.router.navigate(['/subCategory']);
    });
  }
}
