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
import { ImageUploadService } from './service/uploadService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'techlite';
  ngOnInit() {
    let time = new Date();
    // console.log(time.toLocaleString('en-US'));
  }

  priceArray: any = [
    { min: 0, max: 499 },
    { min: 500, max: 999 },
    { min: 1000, max: 1499 },
    { min: 1500, max: 1999 },
    { min: 2000, max: 2499 },
    { min: 3000, max: 2999 },
  ];
  keyword = '';
  send(keyword: any) {
    this.keyword = keyword;
  }
}
