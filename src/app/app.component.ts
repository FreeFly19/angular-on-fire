import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedContact: string;

  title = 'Angular on Fire Chat';

  contactName = '';

  contacts = [
    'Rob',
    'Ed',
    'Jon'
  ];

  addContact() {
    this.contacts.push(this.contactName);
    this.contactName = '';
  }

  selectContact(contact) {
    this.selectedContact = contact;
  }
}
