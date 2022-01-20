export const ApiRoute = {
  Guitars: (id?: string | number) => `/guitars${id ? `/${id}` : ''}`,
} as const;

export const AppRoute = {
  getMainRoute: () => '/',
  getCatalogRoute: (page: string | number = ':page') => `/catalog/page_${page}`,
  getGuitarsRoute: (id: string | number = ':id') => `/guitars/${id}`,
  getWhereToBuyRoute: () => '/where-to-buy',
  getAboutRoute: () => '/about',
  getCartRoute: () => '/cart',
  getPlugRoute: () => '#',
} as const;
