export const renderRatingStars = (rating: number, paintedStar: JSX.Element, unpaintedStar: JSX.Element) => {
  rating = Math.ceil(rating);
  const stars = new Array(rating).fill(paintedStar);
  if (rating === 5) {
    return stars;
  }

  const difference = 5 - rating;
  for (let i = 0; i < difference; i++) {
    stars.push(unpaintedStar);
  }

  return stars;
};
