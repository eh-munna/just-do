const Colors = {
  RED: 'RED',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
} as const;

type Color = (typeof Colors)[keyof typeof Colors];
const paintTheWall = (color: Color) => {
  console.log(`The wall is painted with the color: ${color}`);
};

paintTheWall('RED');
