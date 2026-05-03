const greet = (onePerson: string, ...person: string[]) => {
  console.log({ onePerson });
  person.forEach((p) => {
    console.log(`Hello ${p}`);
  });
};

greet('John Doe', 'Steve Smith', 'Jane Doe');
