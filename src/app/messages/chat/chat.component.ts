import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/map';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from "../../contact/contact.model";
import { ActiveContact } from "../../contact/active-contact.service";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ActiveContact]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageList') messageListEl;
  contact: Contact;
  messages: Message[] = [];
  message: Message;

  constructor(
    private activeContact: ActiveContact,
    private messageService: MessageService
  ) {
    this.message = new Message();
    this.contact = new Contact();
  }

  ngOnInit(): void {
    this.activeContact.contact
      .flatMap(contact => {
        this.contact = contact;
        return this.messageService.messageList(contact);
      })
      .subscribe(messages => {
        this.messages = messages;
        this.scrollMessageListDown();
      });
  }

  ngAfterViewChecked():void {
    this.scrollMessageListDown();
  }

  sendMessage() {
    this.messageService.sendMessage(this.contact, this.message);
    this.message = new Message();
  }

  private scrollMessageListDown() {
    this.messageListEl.nativeElement.scrollTop = this.messageListEl.nativeElement.scrollHeight;
  }
}
