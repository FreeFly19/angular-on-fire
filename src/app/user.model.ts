export class User {
  id: String;
  displayName: String;
}

export function fromFirebaseDbUser(user: any): User {
  return {id: user.$key, displayName: user.displayName};
}
