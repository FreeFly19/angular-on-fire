import { Component, OnInit } from '@angular/core';
import { ContactService } from "../contact.service";
import { ActiveContact } from "../active-contact.service";
import { Contact } from "../contact.model";

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  providers: [ActiveContact]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact();

  constructor(
    private contactService: ContactService,
    private activeContact: ActiveContact
  ) {}

  ngOnInit(): void {
    this.activeContact.contact.subscribe(contact => this.contact = contact);
  }

  saveContact() {
    this.contactService.saveContact(this.contact);
  }

}
