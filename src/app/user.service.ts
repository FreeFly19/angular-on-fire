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

@Injectable()
export class UserService {
  readonly currentUser: Subject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(private afAuth: AngularFireAuth,
              router: Router) {
    afAuth.authState
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

}
