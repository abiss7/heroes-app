export const APP = {
  PAGES: {
    Root: {
      Heroes: 'heroes',
      children: {
        NewHero: 'new-hero',
        Edit: 'edit/:id',
        List: 'list',
        Hero: ':id',
        Search: 'search/:valueSearch',
        SearchMenu: 'search',
      },
      404: '404',
    },
  },
};
