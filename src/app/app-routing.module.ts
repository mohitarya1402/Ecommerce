import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './addToCart/view-cart/view-cart.component';
import { AdminusersComponent } from './admin/adminDashboadr/adminusers.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { AdmincategoryComponent } from './admin/category/admincategory/admincategory.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { ProductMainComponent } from './admin/product/product-main/product-main.component';
import { ProductComponent } from './admin/product/product/product.component';
import { ViewProductComponent } from './admin/product/view-product/view-product.component';
import { AddSubCategoryComponent } from './admin/subCategory/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './admin/subCategory/edit-sub-category/edit-sub-category.component';
import { SubCategoryComponent } from './admin/subCategory/sub-category/sub-category.component';
import { UserRegistrationComponent } from './authentication/registration/user-registration/user-registration.component';
import { IsAdminGuard } from './guards/is-admin.guard';

import { HomeComponent } from './home/home.component';
import { UserProfileFormComponent } from './userFolder/user-profile-form/user-profile-form.component';
import { UserProfileViewComponent } from './userFolder/user-profile-view/user-profile-view.component';
import { UsersComponent } from './userFolder/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'viewProduct/:id', component: ViewProductComponent },
  { path: 'userProfile/:email', component: UserProfileFormComponent },
  { path: 'login', component: UserRegistrationComponent },
  { path: 'profileView', component: UserProfileViewComponent },
  {
    path: 'dashboard',
    component: AdminusersComponent,
    canActivate: [IsAdminGuard],
    children: [
      {
        path: 'category',
        component: AdmincategoryComponent,
        children: [
          { path: 'add', component: AddcategoryComponent },
          { path: ':id/edit', component: EditcategoryComponent },
        ],
      },
      {
        path: 'product',
        component: ProductMainComponent,
        children: [
          { path: '', component: ProductComponent },
          { path: 'addProduct', component: AddProductComponent },
          { path: 'editProduct/:id', component: EditProductComponent },
        ],
      },
      {
        path: 'subCategory',
        component: SubCategoryComponent,
        children: [
          { path: 'addSubCategory', component: AddSubCategoryComponent },
          { path: 'editSubcategory/:id', component: EditSubCategoryComponent },
        ],
      },
      { path: 'allUsers', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
