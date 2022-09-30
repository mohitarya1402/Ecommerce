import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  private needRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  needRefreshMethod(val: boolean) {
    return this.needRefresh.next(val);
  }
}
