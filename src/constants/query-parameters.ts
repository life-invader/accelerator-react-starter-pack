export const ONE_PAGE_GUITAR_LIMIT = 9;

export const QueryParameters = {
  Embed: '_embed',
  Like: 'name_like',
  Sort: '_sort',
  Order: '_order',
  Type: 'type',
  StringCount: 'stringCount',
  PriceGte: 'price_gte',
  PriceLte: 'price_lte',
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
