import { Injectable } from '@angular/core';
// import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class StoreUserdataInLocalService {
  constructor() {}
  name: string = '';
  saveDataInLocalStorage(databaseName: string, name: string) {
    let userDetailsJson = JSON.stringify(name);
    localStorage.setItem(databaseName, userDetailsJson);
  }
  getUserDetailsFromLocalStorage(databaseName: string) {
    let userDetailsJSON = localStorage.getItem(databaseName);
    if (userDetailsJSON) {
      this.name = JSON.parse(userDetailsJSON);
      // this.loggedInEvent.emit(true);
    }
  }
}
