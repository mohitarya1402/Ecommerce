import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { IsAdminService } from '../service/is-admin.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private isuserAdminSer: IsAdminService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('aaaa');
    if (this.isuserAdminSer.isuseradmin) {
      return true;
    } else {
      return false;
    }
  }
}
