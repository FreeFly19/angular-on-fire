import { Injectable } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Contact, fromFirebaseDbContact} from "./contact.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/take";

@Injectable()
export class ContactService {
  readonly contacts: Subject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase
  ) {
    userService.currentUser
      .filter(user => !!user)
      .switchMap((user: User) => this.list(user.id))
      .map(contacts => contacts.map(fromFirebaseDbContact))
      .subscribe(this.contacts);
  }

  save(c: Contact) {
    this.userService.currentUser
      .take(1)
      .subscribe(user => {
        this.db.list(`/users/${user.id}/contacts`).push(c);
      });
  }

  private list(userId: string): FirebaseListObservable<Contact[]> {
    return this.db.list(`/users/${userId}/contacts`);
  }
}
