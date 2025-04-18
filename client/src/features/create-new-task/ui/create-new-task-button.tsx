import { Button } from 'antd';
import styles from './create-new-task-button.module.scss';

export const CreateNewTaskButton = () => {
  return (
    <Button type="primary" className={styles.button}>
      Создать задачу
    </Button>
  );
};
