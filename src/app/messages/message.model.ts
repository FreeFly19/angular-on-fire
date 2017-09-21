import {User} from "../user.model";

export class Message {
  text: string;
  sentAt: Date;
  sender: User;

  constructor(m?: any) {
    this.text = m && m.text;
    this.sender = m && m.sender;
    this.sentAt = m && (typeof m.sentAt === 'number' ? new Date(m.sentAt) : m.sentAt);
  }
}
