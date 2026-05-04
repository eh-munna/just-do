class Animal {
  public name: string;
  public age: number;
  public soundType: string;

  constructor(name: string, age: number, soundType: string) {
    this.name = name;
    this.age = age;
    this.soundType = soundType;
  }
  //   constructor(
  //     public name: string,
  //     public age: number,
  //     public soundType: string,
  //   ) {}

  makeSound() {
    console.log(
      `"${this.name}" of age ${this.age} is making "${this.soundType}" sound`,
    );
  }
}

const dog = new Animal(`Dog`, 5, `Woof Woof`);
dog.makeSound();

const cat = new Animal(`Cat`, 3, `Meow Meow`);
cat.makeSound();

class User {
  name: string;
  age: number;
  role: string;

  constructor(name: string, age: number, role: string) {
    this.name = name;
    this.age = age;
    this.role = role;
  }

  status() {
    console.log(`${this.name} is ${this.role}`);
  }
}

class Student extends User {}

class Teacher extends User {
  designation: string;

  constructor(name: string, age: number, role: string, designation: string) {
    super(name, age, role);
    this.designation = designation;
  }
}

const user1 = new Student(`Alice`, 20, `student`);
user1.status();

const user2 = new Teacher(`Bob`, 35, `teacher`, `Math Teacher`);
user2.status();
