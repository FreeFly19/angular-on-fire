import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import "rxjs/add/operator/filter";

import { UserService } from "../user.service";
import { Contact } from "../contact/contact.model";
import { Message } from "./message.model";
import { Subject } from "rxjs/Subject";
import { MessageSentEvent } from "./messageSent.event";
import { User } from "../user.model";

@Injectable()
export class MessageService {
  readonly sentMessageSubject: Subject<MessageSentEvent> = new Subject();

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {}

  messageList(contact: Contact): Observable<Message[]> {
    return this.userService.currentUser
      .filter(currentUser => !!currentUser)
      .switchMap(currentUser => this.list(contact.id, currentUser.id))
      .map(messages => messages.map(m => new Message(m)));
  }

  sendMessage(receiver: Contact, message: Message) {
    this.userService.currentUser
      .first()
      .subscribe(currentUser => this.saveMessageToDb(receiver, message, currentUser));
  }

  saveMessageToDb(receiver: Contact, message: Message, currentUser: User) {
    message.sender = currentUser;

    this.list(receiver.id, currentUser.id)
      .push({
        text: message.text,
        sentAt: database.ServerValue.TIMESTAMP,
        sender: message.sender
      })
      .then((ms) => this.sentMessageSubject.next(new MessageSentEvent(message, receiver)));
  }

  private list(contactId: string, curUserId: string): FirebaseListObservable<object[]> {
    const chatId = MessageService.getChatId(contactId, curUserId);
    return this.db.list(`/chats/${chatId}`);
  }

  private static getChatId(cId1: string, cId2: string): string {
    return (cId1 > cId2) ? (cId1 + 'AND'+ cId2) : (cId2 + 'AND' + cId1);
  }
}
