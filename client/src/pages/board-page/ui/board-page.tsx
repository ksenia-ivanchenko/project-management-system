import { selectBoardNameById, useDispatch, useSelector } from '@shared';
import { ProjectBoard } from '@widgets/project-board';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './board-page.module.scss';
import { CreateNewTask } from '@features/create-new-task';
import { getTasksForBoard } from '../redux/thunks';

export const BoardPage = () => {
  const { id: strId } = useParams();
  const id = Number(strId);
  const boardName = useSelector((state) => selectBoardNameById(state, id));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getTasksForBoard({ boardId: id, boardName }));
  }, []);

  if (loading) return <>Загрузка...</>; // TODO: добавить скелетоны

  return (
    <div className={styles.page}>
      <h1>{boardName}</h1>
      <ProjectBoard />
      <div className={styles.button}>
        <CreateNewTask defaultValues={{ boardId: id }} />
      </div>
    </div>
  );
};
