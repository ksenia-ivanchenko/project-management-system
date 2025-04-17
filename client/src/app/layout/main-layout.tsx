import { Layout } from 'antd';
import { Header } from '@widgets/header';

const { Content } = Layout;

export const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};
