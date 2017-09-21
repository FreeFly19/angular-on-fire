import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/zip";


import { UserService } from "../user.service";
import { Contact } from "./contact.model";

@Injectable()
export class ContactService {
  private contactList: FirebaseListObservable<Contact[]>;
  readonly contacts: Subject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  constructor(
    private userService: UserService,
    private afDatabase: AngularFireDatabase,
  ) {
    userService.currentUser
      .filter(user => !!user)
      .subscribe(user => {
        this.contactList = afDatabase.list(`/users/${user.id}/contacts`);
        this.contactList
          .map(contacts => contacts.map(ContactService.fromSnapshot))
          .subscribe(this.contacts);
      });
  }

  addContact(email: string) {
    let contactId = UserService.emailToId(email);

    this.userService.getById(contactId)
      .first(user => !!user.displayName)
      .zip(this.userService.currentUser.first())
      .subscribe(results => {
        const currentUser = results[1];
        const foundUser = results[0];

        this.afDatabase
          .object(`/users/${currentUser.id}/contacts/${foundUser.id}`)
          .update({name: foundUser.displayName, starred: false});
      });
  }

  saveContact(contact: Contact) {
    this.userService.currentUser.first()
      .subscribe(curUser => {
        this.afDatabase
          .object(`/users/${curUser.id}/contacts/${contact.id}`)
          .update({name: contact.name, starred: contact.starred});
      });

  }

  private static fromSnapshot(c: any): Contact {
    return {id: c.$key, name: c.name, starred: c.starred};
  }

}
