import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '@shared';

export const Header = () => {
  const location = useLocation();

  const items = [
    {
      key: routes.boards.pathname,
      label: <Link to={routes.boards.getLink()}>{routes.boards.pathname}</Link>,
    },
    {
      key: routes.issues.pathname,
      label: <Link to={routes.issues.getLink()}>{routes.issues.pathname}</Link>,
    },
  ];

  return (
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};
