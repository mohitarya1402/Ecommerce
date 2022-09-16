import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { CategoryserviceService } from '../../../service/categoryservice.service';
import { IProductCategory } from '../../../../model/ICategory';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css'],
})
export class AdmincategoryComponent implements OnInit {
  constructor(private categoryService: CategoryserviceService) {}

  categories: IProductCategory[] = [];
  ngOnInit(): void {
    this.getCategories();
    this.categoryService.categoryEvent.subscribe((_data) => {
      this.getCategories();
    });
  }
  getCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
  deleteCategory(id:string)
  {
    this.categoryService.deleteCategory(id).subscribe(data => {
        this.getCategories();
    })

  }
}
