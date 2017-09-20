import { Component, EventEmitter, Output } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Output() select = new EventEmitter();
  selectedContact: Contact;
  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts = contactService.contacts;
  }

  selectContact(contact) {
    this.selectedContact = contact;
    this.select.next(contact);
  }

  isSelected(contact): boolean {
    return this.selectedContact == contact;
  }
}
