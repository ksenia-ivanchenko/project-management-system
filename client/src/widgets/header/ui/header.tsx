import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '@shared';
import styles from './header.module.scss';

export const Header = () => {
  const location = useLocation();

  const items = [
    {
      key: routes.boards.getLink(),
      label: <Link to={routes.boards.getLink()}>{routes.boards.pathname}</Link>,
    },
    {
      key: routes.issues.getLink(),
      label: <Link to={routes.issues.getLink()}>{routes.issues.pathname}</Link>,
    },
  ];

  return (
    <div className={styles.header}>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        className={styles.menu}
      />
      <Button type="primary" className={styles.button}>
        Создать задачу
      </Button>
    </div>
  );
};
