export const defaultStringsCounts = [4, 6, 7, 12];

export const GuitarType = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele: 'ukulele',
};

export const GuitarInfo = {
  [GuitarType.Acoustic]: {
    name: 'Акустические гитары',
    nameForOne: 'Акустическая гитара',
    id: 'acoustic',
  },
  [GuitarType.Electric]: {
    name: 'Электрогитары',
    nameForOne: 'Электрогитара',
    id: 'electric',
  },
  [GuitarType.Ukulele]: {
    name: 'Укулеле',
    nameForOne: 'Укулеле',
    id: 'ukulele',
  },
};

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
