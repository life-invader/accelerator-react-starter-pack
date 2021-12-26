export const ApiRoute = {
  Guitars: '/guitars',
};

export const QueryParameters = {
  Embed: '_embed',
  Like: 'name_like',
  Sort: '_sort',
  Order: '_order',
} as const;

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const SortOrder = {
  Ascending: 'asc',
  Descending: 'desc',
} as const;

export const EmbedParameters = {
  Comments: 'comments',
} as const;
