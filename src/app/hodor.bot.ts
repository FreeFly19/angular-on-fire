import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

import {MessageService} from "./messages/message.service";
import {UserService} from "./user.service";
import {Message} from "./messages/message.model";
import {User} from "./user.model";

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";
import "rxjs/add/operator/skip";


@Injectable()
export class HodorBot {
  private inputMessage: Subject<String> = new Subject();

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
    messageService.sentMessageSubject
      .filter(messageSentEvent => messageSentEvent.receiver.id.toLocaleLowerCase() === 'hodor')
      .map(messageSentEvent => messageSentEvent.message.text)
      .subscribe(this.inputMessage);

    this.interval();
    this.simpleFilter();
    this.advancedFilter();
  }

  private interval() {
    Observable
      .interval(3000)
      .skip(2)
      .take(3)
      .subscribe(() => this.reply('Hodor// Interval Example'));
  }


  private simpleFilter() {
    this.inputMessage
      .filter(message => message.toLowerCase().startsWith('hi'))
      .subscribe(() => this.reply('Hodor// Greeting'));
  }

  private advancedFilter() {
    this.inputMessage
      .flatMap(message => Observable.from(message.split(' ')))
      .map(word => word.toLowerCase())
      .first(word => word === 'hodor')
      .subscribe(() => this.reply('Hold the door'));
  }


  private reply(text: string) {
    const message = new Message();
    message.text = text;

    message.sender = new User();
    message.sender.id = 'Hodor';
    message.sender.displayName = 'Hodor Rules Again';

    this.userService.currentUser
      .first()
      .subscribe(curUser =>
        this.messageService.saveMessageToDb({id: curUser.id, name: curUser.displayName}, message, message.sender)
      );
  }

}
