import { Component, OnInit } from '@angular/core';
import { productService } from 'src/app/service/productService';
import { IProduct } from 'src/model/IProduct';
declare var $: any;
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService :productService) { }

  ngOnInit(): void {
    $('#menu-toggle').on('click', function () {
      $('#wrapper').toggleClass('toggled');
      $(".fa-solid").toggleClass('fa-angles-left')
      $(".fa-solid").toggleClass('fa-angles-right')
    });
    this.getProduct();
  }
  getProduct()
  {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
      // console.log(this.products) 
  })
  }
}
