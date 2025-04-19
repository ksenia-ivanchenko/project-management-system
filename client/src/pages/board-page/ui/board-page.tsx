import { fetchBoardById } from '@entities/board';
import { TaskType } from '@entities/task';
import { selectBoardNameById, useSelector } from '@shared';
import { ProjectBoard } from '@widgets/project-board';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './board-page.module.scss';

export const BoardPage = () => {
  const { id } = useParams();
  const [boardTasks, setBoardTasks] = useState<TaskType[]>([]);
  const boardName = useSelector((state) =>
    selectBoardNameById(state, Number(id))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchBoardById(Number(id)).then((data) => {
      const tasks = data.map((task) => {
        return { ...task, boardName: boardName, boardId: Number(id) };
      });
      setBoardTasks(tasks);
      setLoading(false);
    });
  }, []);

  if (loading) return <>Загрузка...</>;

  return (
    <div className={styles.page}>
      <h1>{boardName}</h1>
      <ProjectBoard boardTasks={boardTasks} />
    </div>
  );
};
