import { TaskForm, TaskFormSchema, TaskType } from '@entities/task';
import { useBoards } from '@features/get-all-boards';
import { useUsers } from '@features/get-all-users';
import { selectTaskById, useDispatch, useSelector } from '@shared';
import { Button, Modal } from 'antd';
import { editTask } from '../redux/thunks';
import { Link } from 'react-router-dom';
import styles from './edit-task-modal.module.scss';

type EditTaskProps = {
  taskFormOpen: boolean;
  handleClose: () => void;
  currentTask: TaskType;
  showGoToBoardModalButton?: boolean;
};

export const EditTask = ({
  taskFormOpen,
  handleClose,
  currentTask,
  showGoToBoardModalButton,
}: EditTaskProps) => {
  const { boards } = useBoards();
  const { users } = useUsers();
  const dispatch = useDispatch();
  const taskDefaultValues = useSelector(selectTaskById(currentTask?.id));

  const handleSubmit = (updatedData: TaskFormSchema) => {
    handleClose();
    dispatch(
      editTask({
        taskId: currentTask.id,
        boardId: currentTask.boardId,
        updatedData,
      })
    );
  };

  return (
    <Modal
      open={taskFormOpen}
      onCancel={handleClose}
      footer={
        <div className={styles.footer}>
          {showGoToBoardModalButton && (
            <Link
              to={`/board/${currentTask?.boardId}?editTask=${currentTask?.id}`}
              key="to-board"
            >
              На доску
            </Link>
          )}
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form={`update-form-${currentTask?.id}-${taskFormOpen}`}
          >
            Обновить
          </Button>
        </div>
      }
      title="Редактирование задачи"
      destroyOnClose
    >
      <TaskForm
        defaultValues={{
          assigneeId: taskDefaultValues?.assignee.id,
          boardId: currentTask?.boardId,
          ...taskDefaultValues,
        }}
        onSubmit={handleSubmit}
        boards={boards}
        users={users}
        key={currentTask?.id}
        id={`update-form-${currentTask?.id}-${taskFormOpen}`}
        // по тз селект с проектом должен быть не редактируемым, если форма вызвана со страницы доски
        // однако в соответствии с апи, доску задачи вообще нельзя менять
        // поэтому подсвечиваю пользователю, что редактировать это поле нельзя в любом случае
        readonlyFields={['boardId']}
      />
    </Modal>
  );
};
