import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';

import { __metadata } from 'tslib';
import { FileUpload } from '../model/fileMetaData';
import { AddToCartService } from './service/add-to-cart.service';
import { AuthserviceService } from './service/authservice.service';
import { CommonService } from './service/common.service';
import { IsAdminService } from './service/is-admin.service';
import { ImageUploadService } from './service/uploadService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'techlite';
  constructor(
    private authService: AuthserviceService,
    private commonSer: CommonService, // private isadminService: IsAdminService
    private addtocartService: AddToCartService
  ) {}
  ngOnInit() {
    debugger;
    // this.commonSer.needRefreshMethod(true);
    this.addtocartService.needRefreshMethod(true);
    this.addtocartService.cartQuantity.subscribe((val) => {
      console.log('service');
    });
    // let time = new Date();
    this.authService.getUserDetailsFromLocalStorage();
    // this.commonSer.needRefreshMethod(true);
    // this.addtocartService.getcartQuantity();
  }

  keyword = '';
  send(keyword: any) {
    this.keyword = keyword;
  }
}
