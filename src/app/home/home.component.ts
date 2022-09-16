import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/model/IProduct';
import { productService } from '../service/productService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
productArray:IProduct[]=[]
  constructor(private productService:productService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct()
  {
    this.productService.getProduct().subscribe((data) => {
      this.productArray = data;
      console.log(this.productArray)
    })
  }
}
