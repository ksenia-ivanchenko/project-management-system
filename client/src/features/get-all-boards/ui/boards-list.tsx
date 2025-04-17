import { useDispatch, useSelector } from '@shared';
import { BoardCard } from '@entities/board';
import styles from './boards-list.module.scss';
import { useEffect } from 'react';
import { getBoards } from '../redux/thunks';
import { useNavigate } from 'react-router-dom';

export const BoardsList = () => {
  const navigate = useNavigate();

  const handleGoToBoard = (id: number) => {
    navigate(`/board/${id}`);
  };

  const { boards, loading, error } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    // здесь лучше уточнить условия: может ли кто-то извне добавлять доски?
    // если да, то текущая реализация может выдавать не актуальные доски,
    // и возможно стоит подтягивать с апи инфу о проектах чаще, например, при каждом монтировании
    // если же доски статичны или их добавляем только мы, то достаточно один раз подтянуть, как сделано сейчас
    if (!boards.length) {
      dispatch(getBoards());
    }
  }, []);

  if (loading) return <div>Загрузка...</div>; // TODO: добавить скелетоны
  if (error) return <div>{error}</div>;

  return (
    <ul className={styles.ul}>
      {boards.map((board) => (
        <li key={board.id}>
          <BoardCard
            board={board}
            // тоже следует уточнить требования, как будто будет лучше совершать переход по клику на всю карточку, а не кнопку
            onButtonClick={() => handleGoToBoard(board.id)}
          />
        </li>
      ))}
    </ul>
  );
};
