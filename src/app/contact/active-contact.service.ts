import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Injectable()
export class ActiveContact {
  contact: Observable<Contact>;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.contact = this.route.paramMap
      .map(paramMap => paramMap.get('id'))
      .switchMap(id => this.contactService.getContactById(id));
  }
}
