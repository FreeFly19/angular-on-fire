import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import "rxjs/add/observable/of";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";

import {fromFirebaseDbUser, User} from "./user.model";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";


@Injectable()
export class UserService {
  readonly currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              router: Router) {
    afAuth.authState
      .flatMap(user => user? this.getById(user.uid): Observable.of(null))
      .subscribe(this.currentUser);

    this.currentUser
      .subscribe((user) => {
        const path = user? '/': '/login';
        router.navigate([path]);
      });
  }

  signIn(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  getById(userId: string): Observable<User> {
    return this.db.object(`/users/${userId}`)
      .map(fromFirebaseDbUser);
  }
}
