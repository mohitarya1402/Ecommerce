import { Component, OnInit } from '@angular/core';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { subCategoryService } from 'src/app/service/subCategoryService';
import { IProductCategory } from 'src/model/ICategory';
import { ISubcategory } from 'src/model/ISubCategory';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
  // subCategories: ISubcategory[] = [];
  // category: IProductCategory[] = [];
  formattedSubCategory: ISubcategory[] = [];
  constructor(private subcategoryService: subCategoryService,private categoryService:CategoryserviceService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getFormattedSubCategory();
  }
  deleteSubCategory(id:any)
  {
    console.log(id)
    this.subcategoryService.deleteSubCategory(id).subscribe((data) => {
      this.toastr.success("Sub Category Deleted Successfully")
      // this.subcategoryService.getSubCategoryEvent(true)
    })
    this.getFormattedSubCategory();
  }
  getFormattedSubCategory()
  {
  this.formattedSubCategory=[]
        this.categoryService.getCategory().subscribe((categories) => {
          this.subcategoryService.getAllSubCategory().subscribe((subcategories) => {
              for (let category of categories) {
                for (let subcategory of subcategories) {
                  if (category.id == subcategory.categoryName) {
                    this.formattedSubCategory.push({
                      ...subcategory,
                      categoryName: category.category,
                    });
                  }
                }
              }
            });
        });
  }





}
