import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Contact } from './contact/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contactList: FirebaseListObservable<Contact[]>;
  constructor(private db: AngularFireDatabase) {
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

}
