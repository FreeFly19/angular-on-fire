import { Component, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  contacts: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  @Input() contact;

  saveContact() {
    this.db.object(`/contacts/${this.contact.$key}`).update(this.contact);
  }

}
