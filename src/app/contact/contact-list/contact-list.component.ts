import { Component, Input} from '@angular/core';
import { Contact } from "../contact.model";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Input() contacts: Contact[];
  @Input() title: string;
}
