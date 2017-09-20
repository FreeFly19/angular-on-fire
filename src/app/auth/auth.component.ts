import { Component } from '@angular/core';

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
