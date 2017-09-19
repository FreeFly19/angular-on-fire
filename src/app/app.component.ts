import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedContact: { name: string };

  title = 'Angular on Fire Chat';

  contactName = '';

  contacts = [
    { name: 'Rob' },
    { name: 'Ed' },
    { name: 'Jon' }
  ];

  addContact() {
    this.contacts.push({ name: this.contactName });
    this.contactName = '';
  }

  selectContact(contact) {
    this.selectedContact = contact;
  }

}
