import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../service/authservice.service';
import { productService } from '../service/productService';
import { GlobalSearchService } from '../service/searchDataPassService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLogedIn: boolean = false;
  isShow: boolean = true;
  userName: string = '';
  constructor(
    private dataSearch: GlobalSearchService,
    private authService: AuthserviceService,
    private toastr: ToastrService,
    private roouter: Router,
    private productService: productService
  ) {}
  ngOnInit(): void {
    debugger;
    this.authService.getUserDetailsFromLocalStorage();
    console.log(this.authService.userDetails);
    this.isUserLogedIn = this.authService.userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isUserLogedIn = data;
      console.log(data);
      console.log(this.isUserLogedIn);
    });
  }
  name: string = '';
  //search logic
  // @Input() name: string | undefined;

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
}
