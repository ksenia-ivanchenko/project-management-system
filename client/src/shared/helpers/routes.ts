interface Route {
  getLink: () => string;
  pathname: string;
}

interface Routes {
  boards: Route;
  board: Route;
  issues: Route;
}

export const routes: Routes = {
  boards: {
    getLink: () => '/boards',
    pathname: 'Проекты',
  },
  board: {
    getLink: () => '/board/:id',
    pathname: 'Доска',
  },
  issues: {
    getLink: () => '/issues',
    pathname: 'Все задачи',
  },
};
