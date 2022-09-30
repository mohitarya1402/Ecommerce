import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // public userNameandIsAdminDetails: BehaviorSubject<object> =
  //   new BehaviorSubject<object>({});
  // public userNameandIsAdminDetails: Subject<object> = new Subject<Object>();
}
