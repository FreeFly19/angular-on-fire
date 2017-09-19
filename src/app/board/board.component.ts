import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
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
