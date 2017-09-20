import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Contact } from "../contact/contact.model";
import { UserService } from "../user.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  contactList: FirebaseListObservable<Contact[]>;
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {
    this.contactList = db.list('/contacts');
    this.contactList
      .subscribe(contacts => this.contacts = contacts);
  }

  selectedContact: Contact;

  title = 'Angular on Fire Chat';

  contactName = '';

  contacts: Contact[] = [];

  addContact() {
    this.contactList.push({ name: this.contactName } as Contact);
    this.contactName = '';
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
