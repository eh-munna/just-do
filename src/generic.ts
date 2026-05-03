type MakeGenericArr<T> = Array<T>;

const strArr: MakeGenericArr<string> = ['a', 'b', 'c'];

const numArr: MakeGenericArr<number> = [1, 2, 3];

type User = {
  name: string;
  age: number;
};

const userList: MakeGenericArr<User> = [
  {
    name: 'John Doe',
    age: 12,
  },
  {
    name: 'John Doe',
    age: 12,
  },
  {
    name: 'John Doe',
    age: 12,
  },
];
