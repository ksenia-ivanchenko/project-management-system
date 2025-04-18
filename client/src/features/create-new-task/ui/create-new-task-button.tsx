import { Button, Modal } from 'antd';
import styles from './create-new-task-button.module.scss';
import { useState } from 'react';
import { CreateTaskRequest, TaskForm } from '@entities/task';
import { useBoards } from '@features/get-all-boards';
import { useDispatch } from '@shared';
import { createNewTask } from '../redux/thunks';
import { useUsers } from '@features/get-all-users';

export const CreateNewTaskButton = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { boards } = useBoards();
  const { users } = useUsers();

  const handleOpen = () => setTaskFormOpen(true);
  const handleClose = () => setTaskFormOpen(false);

  const handleSubmit = (data: CreateTaskRequest) => {
    dispatch(createNewTask(data));
    handleClose();
  };

  return (
    <>
      <Button type="primary" className={styles.button} onClick={handleOpen}>
        Создать задачу
      </Button>
      <Modal
        open={taskFormOpen}
        onCancel={handleClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="task-form"
          >
            Создать
          </Button>,
        ]}
        title="Создание задачи"
      >
        <TaskForm onSubmit={handleSubmit} boards={boards} users={users} />
      </Modal>
    </>
  );
};
