import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { StoreUserProfileService } from 'src/app/service/store-user-profile.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css'],
})
export class UserProfileFormComponent implements OnInit {
  constructor(
    private profilestoreservice: StoreUserProfileService,
    private authservice: AuthserviceService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute
  ) {}
  userId: string = '';
  userProfileForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userPhone: new FormControl(''),
    userAddress: new FormControl(''),
    userCity: new FormControl(''),
    userState: new FormControl(''),
    userPincode: new FormControl(''),
    isUserAdmin: new FormControl(false),
  });
  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['email'];
    console.log(this.userId);
    // let userId = this.authservice.userDetails?.email;
    // console.log(this.authservice.userDetails?.email);
    this.userProfileForm.patchValue({
      userId: this.userId,
    });
  }
  onSubmit() {
    console.log(this.userProfileForm.value);
    let formValue = this.userProfileForm.value;
    this.profilestoreservice.addUserProfileData(formValue).subscribe((da) => {
      this.toastr.success('Profile updated successfully');
    });
  }
}
