import { Component, NgModule, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { ErrorServiceService } from 'src/app/service/error-service.service';
import { IsAdminService } from 'src/app/service/is-admin.service';
import { StoreUserProfileService } from 'src/app/service/store-user-profile.service';
// import { IUser } from 'src/model/IUser.Interface';
import { IUserProfile } from 'src/model/IUserProfile';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  userId: string | undefined;
  user: IUserProfile[] = [];
  filterUser: IUserProfile[] = [];
  name: string = '';
  isuserAdmin: boolean = false;
  constructor(
    private formbu: FormBuilder,
    private authservice: AuthserviceService,
    private errorService: ErrorServiceService,
    private toastr: ToastrService,
    private route: Router,
    private userprofileservice: StoreUserProfileService
  ) {}
  loginMode: boolean = true;
  loginSignUpForm!: FormGroup;
  errorMessages: any = this.errorService.errorMessages;
  userprofileData: IUserProfile[] = [];
  // private userProfileData: (() => {}) | undefined;
  ngOnInit(): void {
    // this.isuserAdmin.getUserDetails();
    this.loginSignUpForm = this.formbu.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.getUserProfileData(); //this method is to verify that userprofile data is avialable or not
    // this.getUserDetails();
  }
  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }
  onSubmit() {
    let filterUserProfile: IUserProfile[] = [];
    if (this.loginSignUpForm.valid) {
      // console.log(this.loginSignUpForm.value);
      const email = this.loginSignUpForm.value.email;
      const password = this.loginSignUpForm.value.password;
      if (this.loginMode) {
        this.authservice.signInMethod(email, password).subscribe(
          (res) => {
            // debugger;
            // console.log(res.email);
            filterUserProfile = this.userprofileData.filter((data) => {
              this.authservice.loggedInEvent.emit(true);
              return data.userId == res.email;
            });
            // console.log('firebase responce data ');
            // console.log(filterUserProfile);
            this.authservice.showNameAndIsAdmin(filterUserProfile);
            if (filterUserProfile.length == 0) {
              this.route.navigate(['/userProfile', res.email]);
            } else {
              this.route.navigate(['/']);
            }
          },
          (err) => {
            // console.log(this.userprofileData);
            // console.log(err);
            this.toastr.error(this.errorMessages[err.error.error.message]);
          }
        );
      } else {
        this.authservice.signUpMethod(email, password).subscribe(
          (res) => {
            // console.log(res);
          },
          (err) => {
            // console.log(err);
            // console.log(this.userprofileData);
            this.toastr.error(this.errorMessages[err.error.error.message]);
          }
        );
      }
    }
  }
  getUserProfileData() {
    this.userprofileservice.getprofileUser().subscribe((data) => {
      this.userprofileData = data;
      // console.log(data);
    });
  }

  getUserDetails() {
    this.userId = this.authservice.userDetails?.email || '';
    this.userprofileservice.getprofileUser().subscribe((data) => {
      this.user = data;
      this.filterUser = this.user.filter((user) => {
        return this.userId === user.userId;
      });
      // console.log('guard run');
      this.isuserAdmin = this.filterUser[0].isUserAdmin ?? false;
      this.name = this.filterUser[0].userName;
      // console.log(this.isuserAdmin, this.name);
    });
  }
}
