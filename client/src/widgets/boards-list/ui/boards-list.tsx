import { BoardCard } from '@entities/board';
import styles from './boards-list.module.scss';
import { useNavigate } from 'react-router-dom';
import { useBoards } from '@features/get-all-boards';

export const BoardsList = () => {
  const navigate = useNavigate();
  const { boards, loading, error } = useBoards();

  const handleGoToBoard = (id: number) => {
    navigate(`/board/${id}`);
  };

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
