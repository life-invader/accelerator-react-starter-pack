export const GuitarType = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele: 'ukulele',
} as const;

export const GuitarInfo = {
  [GuitarType.Acoustic]: {
    name: 'Акустические гитары',
    id: 'acoustic',
  },
  [GuitarType.Electric]: {
    name: 'Электрогитары',
    id: 'electric',
  },
  [GuitarType.Ukulele]: {
    name: 'Укулеле',
    id: 'ukulele',
  },
} as const;

export const StringsCounts = [
  {
    name: '4-strings',
    count: 4,
  },
  {
    name: '6-strings',
    count: 6,
  },
  {
    name: '7-strings',
    count: 7,
  },
  {
    name: '12-strings',
    count: 12,
  },
];
