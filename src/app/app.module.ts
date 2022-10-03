import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminusersComponent } from './admin/adminDashboadr/adminusers.component';
import { OrderComponent } from './admin/order/order.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdmincategoryComponent } from './admin/category/admincategory/admincategory.component';
import { ProductComponent } from './admin/product/product/product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubCategoryComponent } from './admin/subCategory/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './admin/subCategory/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './admin/subCategory/edit-sub-category/edit-sub-category.component';
import { FilterSubcategoryPipe } from './admin/product/pipe/filter-subcategory.pipe';
import { HomeComponent } from './home/home.component';
import { ProductMainComponent } from './admin/product/product-main/product-main.component';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { ViewProductComponent } from './admin/product/view-product/view-product.component';
import { UserRegistrationComponent } from './authentication/registration/user-registration/user-registration.component';
import { UserLoginComponent } from './authentication/login/user-login/user-login.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './userFolder/users/users.component';
import { UserProfileFormComponent } from './userFolder/user-profile-form/user-profile-form.component';
import { UserProfileViewComponent } from './userFolder/user-profile-view/user-profile-view.component';
import { ViewCartComponent } from './addToCart/view-cart/view-cart.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { CheckOutComponent } from './addToCart/check-out/check-out.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminusersComponent,
    OrderComponent,
    EditcategoryComponent,
    AddcategoryComponent,
    AdmincategoryComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    SubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    FilterSubcategoryPipe,
    HomeComponent,
    ProductMainComponent,
    SearchPipePipe,
    ViewProductComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UsersComponent,
    UserProfileFormComponent,
    UserProfileViewComponent,
    ViewCartComponent,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [MatStepperModule, MatFormFieldModule, MatInputModule],

  providers: [IsAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
