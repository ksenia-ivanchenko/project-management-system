import { BoardType } from '../model/types';
import { Button, Card } from 'antd';
import styles from './board-card.module.scss';

type BoardCardProps = {
  board: BoardType;
  onButtonClick: () => void;
};

export const BoardCard = ({ board, onButtonClick }: BoardCardProps) => {
  return (
    <Card hoverable>
      <div className={styles.container}>
        <h3 className={styles.title}>{board.name}</h3>
        <Button type="text" onClick={onButtonClick}>
          Перейти к доске
        </Button>
      </div>
    </Card>
  );
};
