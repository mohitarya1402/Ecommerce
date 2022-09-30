import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { data, } from 'jquery';
import { filter, Observable, map, Subject } from 'rxjs';
import { IUserProfile } from 'src/model/IUserProfile';
import { finalize, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StoreUserProfileService {
  userprofiledata: IUserProfile[] = [];
  private refreshNeed = new Subject<void>();
  get refreshNeedMethod() {
    return this.refreshNeed;
  }
  constructor(private http: HttpClient) {}
  baseUrl = 'https://ecommerce-68a32-default-rtdb.firebaseio.com/';
  addUserProfileData(userProfile: any): Observable<{ userName: string }> {
    return this.http.post<{ userName: string }>(
      `${this.baseUrl}userProfile.json`,
      userProfile
    );
  }
  //get user Profile data
  getprofileUser() {
    return this.http
      .get<{ [id: string]: IUserProfile }[]>(`${this.baseUrl}userProfile.json`)
      .pipe(
        tap(() => {
          this.refreshNeed.next();
        }),
        map((data) => {
          let formattedCategories: IUserProfile[] = [];
          for (let id in data) {
            formattedCategories.push({
              id,
              ...data[id],
            } as unknown as IUserProfile);
          }
          return formattedCategories;
        })
      );
  }
  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/userProfile/${id}.json`);
  }
  // getUserByUserId(userId: string) {
  //   return this.http.get(`${this.baseUrl}/userProfile/${userId}.json`);
  // }
}
