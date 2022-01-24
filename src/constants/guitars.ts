export const STRINGS_COUNTS = [4, 6, 7, 12] as const;

export const GuitarTypeValue = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele: 'ukulele',
} as const;

export const GuitarInfo = {
  [GuitarTypeValue.Acoustic]: {
    name: 'Акустические гитары',
    nameForOne: 'Акустическая гитара',
    id: 'acoustic',
  },
  [GuitarTypeValue.Electric]: {
    name: 'Электрогитары',
    nameForOne: 'Электрогитара',
    id: 'electric',
  },
  [GuitarTypeValue.Ukulele]: {
    name: 'Укулеле',
    nameForOne: 'Укулеле',
    id: 'ukulele',
  },
} as const;

export const Tabs = {
  Specifications: 'specs',
  Description: 'desc',
} as const;
