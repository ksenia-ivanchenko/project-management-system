import { ReactNode } from 'react';
import styles from './board-segment.module.scss';

type BoardSegmentProps = {
  name: string;
  children: ReactNode;
};

export const BoardSegment = ({ name, children }: BoardSegmentProps) => (
  <div className={styles.segment}>
    <h2 className={styles.name}>{name}</h2>
    {children}
  </div>
);
