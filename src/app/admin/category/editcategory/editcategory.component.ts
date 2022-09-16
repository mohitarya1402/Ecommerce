import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { IProductCategory } from '../../../../model/ICategory';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css'],
})
export class EditcategoryComponent implements OnInit {
  constructor(
    private activatedrouter: ActivatedRoute,
    private categoryService: CategoryserviceService,
    private route: Router
  ) {}
  category: any = [];
  id!: string;
  categoryEditFrom = new FormGroup({
    category: new FormControl(''),
    status: new FormControl(''),
  });
  ngOnInit(): void {
    this.id = this.activatedrouter.snapshot.params['id'];
    this.categoryService.getCategoryById(this.id).subscribe((data) => {
      console.log("edit category")
      console.log(data);
      this.category = data;
      this.categoryEditFrom.setValue({
        category: this.category.category,
        status: this.category.status,
      });
    });
  }
  onClickUpdateCategory() {
    let updatedCategory = this.categoryEditFrom.value;
    this.categoryService
      .editCategory(updatedCategory as IProductCategory, this.id)
      .subscribe((data) => {
        console.log('category updated');
        this.categoryService.addCategoryEvent(true);
      });
    this.route.navigate(['/category']);
  }
}
