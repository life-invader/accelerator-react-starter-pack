import React from 'react';
import PaintedStar from './painted-star/painted-star';
import UnpaintedStar from './unpainted-star/unpainted-star';

const KEY_1 = 1;
const KEY_2 = 99;

type GuitarRatingType = {
  rating: number,
}

function GuitarRating({ rating }: GuitarRatingType) {
  rating = Math.ceil(rating);
  const paintedStars = new Array(rating).fill(null);

  const starDifference = 5 - rating;
  const unpaintedStars = new Array(starDifference).fill(null);

  return (
    <React.Fragment>
      {
        paintedStars.map((_star, index) => <PaintedStar key={`${index + KEY_1}`} />).concat(unpaintedStars.map((_star, index) => <UnpaintedStar key={`${index + KEY_2}`} />))
      }
    </React.Fragment>
  );
}

export default GuitarRating;
