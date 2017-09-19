import { Component } from '@angular/core';

import { UserService } from "../user.service";

@Component({
  selector: 'auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private userService: UserService) {
  }

  signIn() {
    this.userService.signIn();
  }
}
