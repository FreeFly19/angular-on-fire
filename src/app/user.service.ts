import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import "rxjs/add/observable/of";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";

import { User } from "./user.model";


@Injectable()
export class UserService {
  readonly currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private router: Router
  ) {
    afAuth.authState
      .flatMap(user => user? this.getById(UserService.emailToId(user.email)): Observable.of(null))
      .subscribe(this.currentUser);

    this.currentUser
      .subscribe(user => {
        const path = user? '/contacts/welcome': '/login';
        router.navigate([path]);
      });
  }

  signIn(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(authInfo => authInfo.user)
      .then(user => this.update(user))
      .then(user => this.currentUser.next(user));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  update(afUser: any): firebase.Promise<User> {
    const user = {id: UserService.emailToId(afUser.email), displayName: afUser.displayName};

    return this.afDatabase
      .object(`/users/${user.id}`)
      .update({displayName: user.displayName})
      .then(() => user);
  }

  getById(userId: string): Observable<User> {
    return this.afDatabase
      .object(`/users/${userId}`)
      .map(UserService.toUserFromUserSnapshot);
  }

  static emailToId(email: string): string {
    return email.replace('.', 'DOT').replace('@', 'AT');
  }

  static toUserFromUserSnapshot(userSnapshot): User {
    return {id: userSnapshot.$key, displayName: userSnapshot.displayName};
  }
}
