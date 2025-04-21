import { BoardCard } from '@entities/board';
import styles from './boards-list.module.scss';
import { useNavigate } from 'react-router-dom';
import { useBoards } from '@features/get-all-boards';
import { Loader } from '@shared';

export const BoardsList = () => {
  const navigate = useNavigate();
  const { boards, loading, error } = useBoards();

  const handleGoToBoard = (id: number) => {
    navigate(`/board/${id}`);
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <ul className={styles.ul}>
      {boards.map((board) => (
        <li key={board.id}>
          <BoardCard
            board={board}
            onButtonClick={() => handleGoToBoard(board.id)}
          />
        </li>
      ))}
    </ul>
  );
};
