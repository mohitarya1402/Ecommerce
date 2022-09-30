import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/model/ICart';
import { IUserProfile } from 'src/model/IUserProfile';
import { AddToCartService } from '../service/add-to-cart.service';
import { AuthserviceService } from '../service/authservice.service';
import { IsAdminService } from '../service/is-admin.service';
import { productService } from '../service/productService';
import { GlobalSearchService } from '../service/searchDataPassService';
import { StoreUserProfileService } from '../service/store-user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  isUserLogedIn: boolean = false;
  itemAvialable: number = 0;
  isShow: boolean = true;
  userName: string = '';
  cartProduct: ICart[] = [];
  userId: string = '';
  isUserAdmin: boolean = false;
  user: IUserProfile[] = [];
  name: string = '';
  constructor(
    private dataSearch: GlobalSearchService,
    private authService: AuthserviceService,
    private toastr: ToastrService,
    private roouter: Router,
    private addToCartSer: AddToCartService,
    private isadminService: IsAdminService,
    private globalService: GlobalSearchService
  ) {
    this.getIsuseradmin();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.getIsuseradmin();
    this.getCartItem();
  }
  ngOnInit(): void {
    // this.getIsuseradmin();
    this.authService.getUserDetailsFromLocalStorage();
    this.userId = this.authService.userDetails?.email ?? '';
    console.log(this.userId);
    console.log(this.authService.userDetails);
    this.isUserLogedIn = this.authService.userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isUserLogedIn = data;
    });

    this.getCartItem();
  }

  public onInput(event: any) {
    this.dataSearch.searchTerm.next(event.target.value);
  }
  logOut() {
    console.log('clicked ');
    this.authService.logout();
    this.isShow = false;
    this.toastr.success('Log out Successfully');
    this.roouter.navigate(['/']);
  }
  getCartItem() {
    // debugger;
    // this.addToCartSer.
    this.addToCartSer.cartQuantity.subscribe((value) => {
      this.itemAvialable = value;
      console.log(value);
    });
    // this.addToCartSer.getThecartproduct().subscribe((res) => {
    //   console.log(res);
    // });
  }
  users: IUserProfile[] = [];
  getIsuseradmin() {
    this.authService.userNameandIsAdminDetails.subscribe((res) => {
      // console.log('header responce ');
      console.log(res);
      const user = JSON.stringify(res);
      this.users = JSON.parse(user);
    });
  }
}
