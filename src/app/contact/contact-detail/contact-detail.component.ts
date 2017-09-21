import { Component, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {ContactService} from "../contact.service";

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  @Input() contact;

  constructor(private contactService: ContactService) {
  }

  saveContact() {
    this.contactService.saveContact(this.contact);
  }

}
