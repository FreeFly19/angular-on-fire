///<reference path="../user.service.ts"/>
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from "../user.service";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.currentUser
      .first(user => user !== undefined)
      .map(user => !!user)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      });
  }

}
