import { Layout } from 'antd';
import { Header } from '@widgets/header';
import styles from './main-layout.module.scss';

const { Content } = Layout;

export const MainLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};
