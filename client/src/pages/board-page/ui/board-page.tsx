import {
  Loader,
  selectBoardNameById,
  selectTaskById,
  useDispatch,
  useSelector,
} from '@shared';
import { ProjectBoard } from '@widgets/project-board';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './board-page.module.scss';
import { CreateNewTask } from '@features/create-new-task';
import { getTasksForBoard } from '../redux/thunks';
import { EditTask } from '@features/edit-task';

export const BoardPage = () => {
  const { id: strId } = useParams();
  const id = Number(strId);
  const boardName = useSelector((state) => selectBoardNameById(state, id));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.boards);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('editTask');
  const task = useSelector(selectTaskById(Number(taskId)));

  const handleClose = () => {
    searchParams.delete('editTask');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(getTasksForBoard({ boardId: id, boardName }));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <h1>{boardName}</h1>
      <ProjectBoard />
      <div className={styles.button}>
        <CreateNewTask defaultValues={{ boardId: id }} />
      </div>
      {task && (
        <EditTask
          taskFormOpen={!!taskId}
          handleClose={handleClose}
          currentTask={task}
          showGoToBoardModalButton={false}
        />
      )}
    </div>
  );
};
