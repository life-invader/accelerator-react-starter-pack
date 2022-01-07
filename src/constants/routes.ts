export const ApiRoute = {
  Guitars: () => '/guitars',
};

export const AppRoute = {
  Main: () => '/',
  Catalog: (page: string | number = ':page') => `/catalog/page_${page}`,
  Guitars: (id: string | number = ':page') => `/guitars/${id}`,
  WhereToBuy: () => '/where-to-buy',
  About: () => '/about',
  Cart: () => '/cart',
  Plug: () => '#',
};
