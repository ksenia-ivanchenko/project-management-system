import { selectBoardNameById, useDispatch, useSelector } from '@shared';
import { ProjectBoard } from '@widgets/project-board';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './board-page.module.scss';
import { CreateNewTask } from '@features/create-new-task';
import { getTasksForBoard } from '../redux/thunks';

export const BoardPage = () => {
  const { id } = useParams();
  const boardName = useSelector((state) =>
    selectBoardNameById(state, Number(id))
  );
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getTasksForBoard({ boardId: Number(id), boardName }));
  }, []);

  if (loading) return <>Загрузка...</>; // TODO: добавить скелетоны

  return (
    <div className={styles.page}>
      <h1>{boardName}</h1>
      <ProjectBoard />
      <CreateNewTask />
    </div>
  );
};
