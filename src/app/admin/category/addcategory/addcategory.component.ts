import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { IProductCategory } from '../../../../model/ICategory';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryserviceService,
    private toastr: ToastrService,private router:Router  ) {}

  ngOnInit(): void {
    this.getdata();
    let time = new Date();
    let timeString: any = <unknown>time.toLocaleString();
    this.categoryAddingFrom.patchValue({
      timeAndDate: timeString,
    });
  }
  categoryAddingFrom: FormGroup = new FormGroup({
    category: new FormControl(''),
    status: new FormControl(''),
    timeAndDate: new FormControl(''),
  });
  // categor = this.categoryAddingFrom.value;
  // time = new Date();
  // timeString: string = this.time.toLocaleString();
  //         this.categoryAddingFrom.patchValue({
  //         timeAndDate: this.timeString,
  //       });
  categoriesArray: IProductCategory[] = [];

  isategoryAvialable = false;
  checkCategoryAvialable(InputCategory: any) {
    for (let category of this.categoriesArray) {
      if (category.category.toLowerCase() == InputCategory.toLowerCase()) {
        this.isategoryAvialable = true;
        break;
      }
    }
    return this.isategoryAvialable;
  }
  onClickAddCategory() {
    let categor = this.categoryAddingFrom.value;
    let time = new Date();
    let timeString: any = time.toLocaleString();
    let categoryAvialable = this.checkCategoryAvialable(categor.category);
    if (!categoryAvialable) {
      this.categoryService.addProductCategory(categor).subscribe((data) => {
        this.categoryAddingFrom.patchValue({
          timeAndDate: timeString,
        });
        this.categoryService.addCategoryEvent(true);
        this.toastr.success('Category added successfully');
        this.router.navigate(['/category']);
        this.categoryAddingFrom.reset();
      });
    } else {
      // console.log('category is avialable');
      this.toastr.error('Category already available');
    }
  }
  getdata() {
    this.categoryService.getCategory().subscribe((data) => {
      // console.log(data.length);
      this.categoriesArray = data;
      console.log(this.categoriesArray);
    });
  }
  clearForm() {}
}
