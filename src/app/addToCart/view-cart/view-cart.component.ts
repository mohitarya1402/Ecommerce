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
export class ViewCartComponent implements OnInit, OnChanges {
  filterCartProducts: ICart[] = [];
  totalPrice: number = 0;
  quantity: number = 1;
  userId: string = '';
  constructor(
    private cartService: AddToCartService,
    private authService: AuthserviceService,
    private commonService: CommonService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    // this.getFilterkartProduct();
  }
  cartProduct: ICart[] = [];
  ngOnInit(): void {
    // this.getFilterkartProduct();
    // this.cartService.getcartQuantity(this.filterCartProducts.length)
    // this.commonService.subscribe((res) => {
    // })
    this.cartService.needRefresh.subscribe((res) => {
      this.getFilterkartProduct();
    });
    // this.getFilterkartProduct();
  }

  calculatetotalPrice() {
    // console.log(this.filterCartProducts);
    this.totalPrice = 0;
    for (let product of this.filterCartProducts) {
      // console.log(product.productPrice);
      this.totalPrice += product.productPrice * product.quantity;
    }
    return this.totalPrice;
  }
  onClickSubtractQuantity(product: ICart) {
    product.quantity = product.quantity - 1 > 0 ? product.quantity - 1 : 1;
    this.cartService
      .editCart(product, product.productId ?? '')
      .subscribe((it) => {
        // console.log('prodt quantity updatedsuccefully');
      });
  }
  onClickAddQuantity(product: ICart) {
    product.quantity = product.quantity + 1;
    this.cartService
      .editCart(product, product.productId ?? '')
      .subscribe((it) => {
        // console.log('prodt quantity updatedsuccefully');
      });
  }
  getFilterkartProduct() {
    // debugger;
    this.userId = this.authService.userDetails?.email ?? '';
    this.cartService.getThecartproduct().subscribe((data) => {
      // console.log(data);
      const val = JSON.stringify(data);
      this.cartProduct = JSON.parse(val);
      debugger;
      // console.log(typeof this.userId);
      for (let it of this.cartProduct) {
        // console.log(typeof it.userId);
        let tempId = it.userId;
        // if (tempId==this.userId)
        if (tempId === this.userId) {
          this.filterCartProducts.push(it);
          // this.filterCartProducts.push({
          //   imageUrl: it.imageUrl,
          //   userId: it.userId,
          //   quantity: it.quantity,
          //   productPrice: it.productPrice,
          //   brandName: it.brandName,
          //   productName: it.productName,
          //   color: it.color,
          //   size: it.size,
          // });
        }
      }
      this.cartService.getcartQuantity(this.filterCartProducts.length);
      return this.filterCartProducts;
      console.log(' cart length ' + this.filterCartProducts.length);
    });
  }
}
