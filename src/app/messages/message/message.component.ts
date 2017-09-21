import {Component, Input, OnInit} from '@angular/core';

import {Message} from '../message.model';
import {UserService} from "../../user.service";
import {Contact} from "../../contact/contact.model";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() contact: Contact;
  isCurrentUserAuthor: boolean = false;

  ngOnInit(): void {
    this.isCurrentUserAuthor = this.message.sender.id !== this.contact.id;
  }

  getSentData(): string {
    return this.message.sentAt.toLocaleString();
  }

  getAuthorName():string {
    return this.isCurrentUserAuthor ? 'You' : this.contact.name;
  }
}
