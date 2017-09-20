import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {ContactService} from "../contact/contact.service";
import {Contact} from "../contact/contact.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  selectedContact: Contact;

  title = 'Angular on Fire Chat';

  contactName = '';

  constructor(
    private userService: UserService,
    private contactService: ContactService
  ) {
  }

  addContact(contact) {
    console.log(contact);
    this.contactService.save(contact);
    this.contactName = '';
  }

  selectContact(contact) {
    this.selectedContact = contact;
  }

  signOut() {
    this.userService.signOut();
  }
}
