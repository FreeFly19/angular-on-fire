import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/from";

import { Contact } from "../contact/contact.model";
import { UserService } from "../user.service";
import { ContactService } from "../contact/contact.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  selectedContact: Contact;
  title = 'Angular on Fire Chat';
  contactEmail = '';
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private userService: UserService
  ) {
    contactService.contacts.subscribe(contacts => this.contacts = contacts)
  }

  addContact() {
    this.contactService.addContact(this.contactEmail);
    this.contactEmail = '';
  }

  selectContact(contact) {
    this.selectedContact = contact;
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
