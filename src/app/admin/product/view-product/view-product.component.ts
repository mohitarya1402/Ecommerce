import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productService } from 'src/app/service/productService';
import { IProduct } from 'src/model/IProduct';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  products!: IProduct;
  size: string[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: productService
  ) {}
  id: string = '';
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getProductbyId(this.id);
  }

  getProductbyId(id: string) {
    this.productService.getProductById(id).subscribe((data) => {
      this.products = data;
    });
  }
}
