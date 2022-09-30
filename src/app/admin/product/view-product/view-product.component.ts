import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { productService } from 'src/app/service/productService';
import { StoreUserdataInLocalService } from 'src/app/service/store-userdata-in-local.service';
import { ICart } from 'src/model/ICart';
import { IProduct } from 'src/model/IProduct';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  products!: IProduct;
  size: string[] = [];
  userId: string = '';
  isSizeSelect: any = true;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: productService,
    private authservice: AuthserviceService,
    private addIntocartService: AddToCartService,
    private route: Router
  ) {}
  id: string = '';
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.userId = this.authservice.userDetails?.email ?? '';
    console.log(this.userId);
    this.getProductbyId(this.id);
    this.addToCartform.patchValue({
      // userId: this.userId,
      productId: this.id,
    });
  }
  addToCartform: FormGroup = new FormGroup({
    size: new FormControl('', Validators.required),
    // productId: new FormControl(''),
    // userId: new FormControl(''),
    // quantity: new FormControl(1),
  });
  getProductbyId(id: string) {
    this.productService.getProductById(id).subscribe((data) => {
      this.products = data;
    });
  }
  addToCart() {
    debugger;
    // console.log(productId);
    this.isSizeSelect = this.addToCartform.get('size')?.valid;
    let size = this.addToCartform.value.size;
    let productDetails: ICart = {
      productId: this.id,
      userId: this.userId,
      quantity: 1,
      productPrice: +this.products.price,
      brandName: this.products.brandName,
      productName: this.products.productName,
      color: this.products.color,
      size: size,
      imageUrl: this.products.imageURL,
    };
    if (this.addToCartform.valid) {
      console.log(productDetails);
      this.userId = this.authservice.userDetails?.email ?? '';
      this.addIntocartService.addToCart(productDetails).subscribe((a) => {
        this.route.navigate(['viewCart']);
      });
    }
  }
  istouchedFunction() {
    this.isSizeSelect = this.addToCartform.get('size')?.untouched;
    console.log(' is untouched ' + this.isSizeSelect);
  }
}
