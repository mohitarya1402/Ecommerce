import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { CommonService } from 'src/app/service/common.service';
import { productService } from 'src/app/service/productService';
import { ICart } from 'src/model/ICart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  filterCartProducts: ICart[] = [];
  totalPrice: number = 0;
  quantity: number = 1;
  userId: string = '';
  constructor(
    private cartService: AddToCartService,
    private authService: AuthserviceService
  ) {}

  cartProduct: ICart[] = [];
  ngOnInit(): void {
    this.cartService.needRefresh.subscribe((res) => {
      this.getFilterkartProduct();
    });
    // this.getFilterkartProduct();
  }

  calculatetotalPrice() {
    this.totalPrice = 0;
    for (let product of this.filterCartProducts) {
      this.totalPrice += product.productPrice * product.quantity;
    }
    return this.totalPrice;
  }
  onClickSubtractQuantity(product: ICart) {
    product.quantity = product.quantity - 1 > 0 ? product.quantity - 1 : 1;
    this.cartService
      .editCart(product, product.productId ?? '')
      .subscribe((it) => {});
  }
  onClickAddQuantity(product: ICart) {
    product.quantity = product.quantity + 1;
    this.cartService
      .editCart(product, product.productId ?? '')
      .subscribe((it) => {});
  }
  getFilterkartProduct() {
    // debugger;
    this.userId = this.authService.userDetails?.email ?? '';
    this.cartService.getThecartproduct().subscribe((data) => {
      const val = JSON.stringify(data);
      this.cartProduct = JSON.parse(val);
      debugger;
      for (let it of this.cartProduct) {
        let tempId = it.userId;
        if (tempId === this.userId) {
          this.filterCartProducts.push(it);
        }
      }
      this.cartService.getcartQuantity(this.filterCartProducts.length);
      // return this.filterCartProducts;
    });
  }
}
