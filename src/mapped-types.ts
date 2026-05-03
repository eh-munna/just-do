interface User {
  id: number;
  age: number;
  name: string;
  address: string;
}

type ReadOnlyUser<T> = {
  readonly [K in keyof T]: T[K];
};

type OptionalUser<T> = {
  [K in keyof T]?: T[K];
};
