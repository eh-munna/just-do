interface User {
  id: number;
  name: string;
}

type CheckUser<T> = T extends keyof User ? 'Valid User' : 'Invalid User';
