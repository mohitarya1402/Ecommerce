import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { StoreUserProfileService } from 'src/app/service/store-user-profile.service';
import { IUserProfile } from 'src/model/IUserProfile';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IUserProfile[] = [];
  constructor(private profileService: StoreUserProfileService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.profileService.getprofileUser().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
  onClickMakeUserAdmin(id: any, val: boolean) {
    console.log(val);
    this.profileService.getUserById(id).subscribe((data) => {
      console.log(data);
      let tempUser: IUserProfile[] = [];
      tempUser[0].isUserAdmin = val;
    });
  }
}
