export class User {
  id: string;
  displayName: string;
}

export function fromFirebaseDbUser(user: any): User {
  return {id: user.$key, displayName: user.displayName};
}
