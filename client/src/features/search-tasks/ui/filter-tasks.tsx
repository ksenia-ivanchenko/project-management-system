import { Status } from '@entities/task';
import {
  setBoardFilter,
  setStatusFilter,
  useDispatch,
  useSelector,
} from '@shared';
import { Select, SelectProps } from 'antd';
import styles from './filter-tasks.module.scss';

export const FilterTasks = () => {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boards);

  const selectedBoards = useSelector((state) => state.tasks.selectedBoardId);
  const selectedStatuses = useSelector((state) => state.tasks.selectedStatus);

  const handleBoardChange = (value: string[]) => {
    const ids = value.map((item) => Number(item));
    dispatch(setBoardFilter(ids.length ? ids : null));
  };

  const handleStatusChange = (value: string[]) => {
    dispatch(setStatusFilter(value.length ? value : null));
  };

  const boardOptions: SelectProps['options'] = boards.map((board) => ({
    label: board.name,
    value: board.id.toString(),
  }));

  const statusOptions: SelectProps['options'] = Object.values(Status).map(
    (status) => ({ label: status, value: status })
  );

  return (
    <div className={styles.container}>
      <Select
        mode="multiple"
        allowClear
        placeholder="Фильтр по доскам"
        options={boardOptions}
        onChange={handleBoardChange}
        value={(selectedBoards || []).map(String)}
        className={styles.select}
      />
      <Select
        mode="multiple"
        allowClear
        placeholder="Фильтр по статусу"
        options={statusOptions}
        onChange={handleStatusChange}
        value={selectedStatuses || []}
        className={styles.select}
      />
    </div>
  );
};
