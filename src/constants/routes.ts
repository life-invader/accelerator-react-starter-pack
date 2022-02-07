const CATALOG_FIRST_PAGE = 1;

export const ApiRoute = {
  Guitars: (id?: string | number) => `/guitars${id ? `/${id}` : ''}`,
  Comments: () => '/comments',
  Coupons: () => '/coupons',
} as const;

export const AppRoute = {
  getMainRoute: () => '/',
  getCatalogRoute: (page: string | number | boolean = ':page') => {   // ':page' используется для определения роутов в App
    if (page === true) {
      page = CATALOG_FIRST_PAGE;
    }
    return `/catalog/page_${page}`;
  },
  getGuitarsRoute: (id: string | number = ':id') => `/guitars/${id}`,
  getWhereToBuyRoute: () => '/where-to-buy',
  getAboutRoute: () => '/about',
  getCartRoute: () => '/cart',
  getPlugRoute: () => '#',
} as const;
