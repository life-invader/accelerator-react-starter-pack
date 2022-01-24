type RatingType = {
  rating: number,
  starWidth?: string,
  starHeight?: string,
}

const REVIEW_STARS_NUMBER = 5;
const ITEM_KEY = '99';

function Rating({ rating = 1, starWidth = '12', starHeight = '12' }: RatingType) {
  rating = Math.ceil(rating);
  const paintedStars = new Array(rating).fill(null);

  const starDifference = REVIEW_STARS_NUMBER - rating;
  const unpaintedStars = new Array(starDifference).fill(null);

  return (
    <>
      {
        paintedStars.map((_star, index) => (
          <svg key={`${ITEM_KEY + index}`} width={starWidth} height={starHeight} aria-hidden="true" data-testid='painted-star'>
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        )).concat(unpaintedStars.map((_star, index) => (
          <svg key={`${Number(ITEM_KEY) - index}`} width="12" height="11" aria-hidden="true" data-testid='unpainted-star'>
            <use xlinkHref="#icon-star"></use>
          </svg>
        )))
      }
    </>
  );
}

export default Rating;
