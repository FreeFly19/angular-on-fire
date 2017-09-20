import { Component } from '@angular/core';

import { Contact } from './contact/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedContact: Contact;

  title = 'Angular on Fire Chat';

  contactName = '';

  contacts: Contact[] = [
    { name: 'Rob' },
    { name: 'Ed' },
    { name: 'Jon' }
  ] as Contact[];

  addContact() {
    this.contacts.push({ name: this.contactName } as Contact);
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
