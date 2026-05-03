let value: any;

value = 'ts assertion';
console.log((value as string).length);

const getValue = (value: unknown): string | number | undefined => {
  if (typeof value === 'string') {
    return (value as string).toUpperCase();
  } else {
    return (value as number) * 2;
  }
};

const result1 = getValue('checking...') as string;
const result2 = getValue(10) as number;

console.log({ result1 }, { result2 });
