export class Contact {
  id?: string;
  userId: string;
  displayName: string;
}

export function fromFirebaseDbContact(c: any): Contact {
  return {id: c.$key, userId: c.userId, displayName: c.displayName};
}
