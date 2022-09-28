import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { CUser } from 'src/model/CUser';
import { IUser } from 'src/model/IUser.Interface';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  apiKey = 'AIzaSyA9uqZgo7amzAbW7q3u1FyDvKykzNB16J0';
  // user: any;
  // user = new Subject<CUser>
  userDetails: IUser | null = null;

  loggedInEvent = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}

  signUpMethod(email: string, password: string) {
    return this.http.post<IUser>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  signInMethod(email: string, password: string) {
    return this.http
      .post<IUser>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((data) => {
          // debugger;
          this.userDetails = data;
          console.log(this.userDetails);
          this.saveDataInLocalStorage();
        })
      );
  }
  saveDataInLocalStorage() {
    let userDetailsJson = JSON.stringify(this.userDetails);
    localStorage.setItem('userDetails', userDetailsJson);
  }
  // getUserDetailsFromLocalStorage() {
  //   let userDetailsJson = localStorage.getItem('userDetails');
  //   if (userDetailsJson) {
  //     this.userDetails = JSON.parse(userDetailsJson);
  //     this.loggedInEvent.emit(true);
  //   }
  // }
  getUserDetailsFromLocalStorage() {
    let userDetailsJSON = localStorage.getItem('userDetails');

    if (userDetailsJSON) {
      this.userDetails = JSON.parse(userDetailsJSON);
      this.loggedInEvent.emit(true);
    }
  }
  logout() {
    localStorage.removeItem('userDetails');
    this.userDetails = null;
    this.loggedInEvent.emit(false);
  }
}
