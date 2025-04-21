import { Button, Modal } from 'antd';
import styles from './create-new-task.module.scss';
import { useState } from 'react';
import {
  CreateTaskRequest,
  Status,
  TaskForm,
  TaskFormSchema,
} from '@entities/task';
import { useBoards } from '@features/get-all-boards';
import { useDispatch } from '@shared';
import { createNewTask } from '../redux/thunks';
import { useUsers } from '@features/get-all-users';
import { useParams } from 'react-router-dom';

type CreateNewTaskProps = {
  defaultValues?: Partial<TaskFormSchema>;
  readonlyFields?: (keyof TaskFormSchema)[];
};

export const CreateNewTask = ({
  defaultValues,
  readonlyFields,
}: CreateNewTaskProps) => {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { boards } = useBoards();
  const { users } = useUsers();
  const params = useParams();

  const routeBoardId = params.id ? Number(params.id) : undefined;
  const isOnBoardPage = !!routeBoardId;

  const mergedDefaultValues: Partial<TaskFormSchema> = {
    ...defaultValues,
    boardId: isOnBoardPage ? routeBoardId : defaultValues?.boardId,
    // в соответствии с апи, нельзя создать задачу в статусе, отличном от бэклога
    status: Status.BACKLOG,
  };
  const mergedReadonlyFields = [
    ...(readonlyFields ?? []),
    'status' as const,
    ...(isOnBoardPage ? ['boardId' as const] : []),
  ] as (keyof TaskFormSchema)[];

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
            form="create-form"
          >
            Создать
          </Button>,
        ]}
        title="Создание задачи"
      >
        <TaskForm
          key={`form-${mergedDefaultValues.boardId}`}
          defaultValues={mergedDefaultValues}
          onSubmit={handleSubmit}
          boards={boards}
          users={users}
          id="create-form"
          readonlyFields={mergedReadonlyFields}
        />
      </Modal>
    </>
  );
};
