import { TaskForm, TaskFormSchema, TaskType } from '@entities/task';
import { useBoards } from '@features/get-all-boards';
import { useUsers } from '@features/get-all-users';
import { useDispatch } from '@shared';
import { Button, Modal } from 'antd';
import { editTask } from '../redux/thunks';
import { Link } from 'react-router-dom';
import styles from './edit-task-modal.module.scss';

type EditTaskModalProps = {
  taskFormOpen: boolean;
  handleClose: () => void;
  currentTask: TaskType;
};

export const EditTaskModal = ({
  taskFormOpen,
  handleClose,
  currentTask,
}: EditTaskModalProps) => {
  const { boards } = useBoards();
  const { users } = useUsers();
  const dispatch = useDispatch();

  const handleSubmit = (updatedData: TaskFormSchema) => {
    dispatch(
      editTask({
        taskId: currentTask.id,
        updatedData,
      })
    );
    handleClose();
  };

  return (
    <Modal
      open={taskFormOpen}
      onCancel={handleClose}
      footer={
        <div className={styles.footer}>
          <Link to={`/board/${currentTask?.boardId}`} key="to-board">
            На доску
          </Link>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form={`update-form-${currentTask?.id}`}
          >
            Обновить
          </Button>
        </div>
      }
      title="Редактирование задачи"
    >
      <TaskForm
        defaultValues={{
          ...currentTask,
          assigneeId: currentTask?.assignee.id,
        }}
        onSubmit={handleSubmit}
        boards={boards}
        users={users}
        key={currentTask?.id}
        id={`update-form-${currentTask?.id}`}
      />
    </Modal>
  );
};
