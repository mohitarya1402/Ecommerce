import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUserProfile } from 'src/model/IUserProfile';
import { AuthserviceService } from './authservice.service';
import { GlobalSearchService } from './searchDataPassService';
import { StoreUserProfileService } from './store-user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminService {
  user: IUserProfile[] = [];
  filterUser: IUserProfile[] = [];
  userId: string = '';
  isuseradmin: boolean = false;
  name: string = '';
  private refreshNeed = new Subject<void>();
  get refreshNeedMethod() {
    return this.refreshNeed;
  }
  constructor(
    private userprofileser: StoreUserProfileService,
    private getlocalService: AuthserviceService,
    private isUseradminser: GlobalSearchService
  ) {}

  // getUserDetails() {
  //   this.userId = this.getlocalService.userDetails?.email || '';
  //   this.userprofileser.getprofileUser().subscribe((data) => {
  //     this.user = data;
  //     this.filterUser = this.user.filter((user) => {
  //       return this.userId === user.userId;
  //     });
  //     console.log('guard run');
  //     this.isuseradmin = this.filterUser[0].isUserAdmin ?? false;
  //     this.name = this.filterUser[0].userName;
  //     // this.isUseradminser.userNameandIsAdminDetails.next({
  //     //   name: this.name,
  //     //   _isUseradminser: this.isuseradmin,
  //     // });
  //   });
  // }
}
