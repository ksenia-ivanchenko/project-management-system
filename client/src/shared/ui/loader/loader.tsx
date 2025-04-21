import { Spin } from 'antd';
import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.loaderWrapper}>
    <Spin size="large" />
  </div>
);
