import { Component } from '@angular/core';
import "rxjs/add/operator/filter";
import "rxjs/add/observable/from";

import { Contact } from "../contact/contact.model";
import { UserService } from "../user.service";
import { ContactService } from "../contact/contact.service";
import { User } from "../user.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  title = 'Angular on Fire Chat';
  contactEmail = '';
  contacts: Contact[] = [];
  currentUser: User;

  constructor(
    private contactService: ContactService,
    private userService: UserService
  ) {
    userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    contactService.contacts.subscribe(contacts => this.contacts = contacts)
  }

  addContact() {
    this.contactService.addContact(this.contactEmail);
    this.contactEmail = '';
  }


  starredContacts(): Contact[] {
    return this.contacts.filter(c => c.starred);
  }

  otherContacts(): Contact[] {
    return this.contacts.filter(c => !c.starred);
  }

  signOut() {
    this.userService.signOut();
  }
}
