const user: {
  category: 'user';
  name: string;
  age: number;
  isAdmin: boolean;
  readonly org: string;
} = {
  category: 'user',
  name: 'John Doe',
  age: 34,
  isAdmin: true,
  org: 'only readable value',
};

// Error: cannot assign to 'user.org' a new value because it is a read-only property

user.org = 'new value';
