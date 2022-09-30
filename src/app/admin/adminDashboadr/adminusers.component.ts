import { Component, OnInit } from '@angular/core';
import { productService } from 'src/app/service/productService';
import { StoreUserProfileService } from 'src/app/service/store-user-profile.service';
import { IProduct } from 'src/model/IProduct';
import { IUserProfile } from 'src/model/IUserProfile';
declare var $: any;
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css'],
})
export class AdminusersComponent implements OnInit {
  products: IProduct[] = [];
  users: IUserProfile[] = [];
  constructor(
    private productService: productService,
    private profileService: StoreUserProfileService
  ) {}

  ngOnInit(): void {
    $('#menu-toggle').on('click', function () {
      $('#wrapper').toggleClass('toggled');
      $('.fa-solid').toggleClass('fa-angles-left');
      $('.fa-solid').toggleClass('fa-angles-right');
    });
    this.getProduct();
    this.getUserDetails();
  }
  getProduct() {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
      // console.log(this.products)
    });
  }
  getUserDetails() {
    this.profileService.getprofileUser().subscribe((data) => {
      this.users = data;
      // console.log(this.users);
    });
  }
}
