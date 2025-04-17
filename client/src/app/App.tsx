import { routes } from '@shared';
import './normalize.scss';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layout/main-layout';
import { BoardPage, BoardsListPage, IssuesPage } from '@pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={routes.boards.getLink()} />,
  },
  {
    path: routes.board.getLink(),
    element: (
      <MainLayout>
        <BoardPage />
      </MainLayout>
    ),
  },
  {
    path: routes.boards.getLink(),
    element: (
      <MainLayout>
        <BoardsListPage />
      </MainLayout>
    ),
  },
  {
    path: routes.issues.getLink(),
    element: (
      <MainLayout>
        <IssuesPage />
      </MainLayout>
    ),
  },
]);

export const App = () => <RouterProvider router={router} />;

export default App;
