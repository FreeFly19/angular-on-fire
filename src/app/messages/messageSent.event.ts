import { Message } from "./message.model";
import { Contact } from "../contact/contact.model";

export class MessageSentEvent {
  constructor(
    readonly message: Message,
    readonly receiver: Contact
  ) {}
 }
