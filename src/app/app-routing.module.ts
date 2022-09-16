import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminusersComponent } from './admin/adminDashboadr/adminusers.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { AdmincategoryComponent } from './admin/category/admincategory/admincategory.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { ProductComponent } from './admin/product/product/product.component';
import { AddSubCategoryComponent } from './admin/subCategory/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './admin/subCategory/edit-sub-category/edit-sub-category.component';
import { SubCategoryComponent } from './admin/subCategory/sub-category/sub-category.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: AdminusersComponent,
    children: [
      // { path: 'addProduct', component: AddProductComponent },
      { path: 'category',component: AdmincategoryComponent,
        children: [
          { path: 'add', component: AddcategoryComponent },
          { path: ':id/edit', component: EditcategoryComponent },
        ],
      },

      {
        path: 'product',
        component: ProductComponent,
        children: [
          { path: 'addProduct', component: AddProductComponent },
          { path: 'editProduct/:id', component: EditProductComponent },
        ],
      },
      { path: 'subCategory', component: SubCategoryComponent },
      {path: 'editSubcategory/:id',component: EditSubCategoryComponent,},
      { path: 'addSubCategory', component: AddSubCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
