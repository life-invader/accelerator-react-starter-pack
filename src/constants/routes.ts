export const ApiRoute = {
  Guitars: () => '/guitars',
} as const;

export const AppRoute = {
  getMainRoute: () => '/',
  getCatalogRoute: (page: string | number = ':page') => `/catalog/page_${page}`,
  getGuitarsRoute: (id: string | number = ':page') => `/guitars/${id}`,
  getWhereToBuyRoute: () => '/where-to-buy',
  getAboutRoute: () => '/about',
  getCartRoute: () => '/cart',
  getPlugRoute: () => '#',
} as const;
