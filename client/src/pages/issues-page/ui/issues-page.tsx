import {
  FilterTasks,
  SearchTasks,
  selectSearchedTasks,
} from '@features/search-tasks';
import { setSearchQuery, useDispatch, useSelector } from '@shared';
import { TasksList } from '@widgets/tasks-list';
import styles from './issues-page.module.scss';
import { CreateNewTask } from '@features/create-new-task';

export const IssuesPage = () => {
  const dispatch = useDispatch();
  const searchTasks = useSelector(selectSearchedTasks);
  const handleSearch = (value: string) => dispatch(setSearchQuery(value));

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchTasks onSearch={handleSearch} />
        <FilterTasks />
      </div>
      <TasksList tasks={searchTasks} showGoToBoardModalButton={true} />
      <div className={styles.button}>
        <CreateNewTask />
      </div>
    </div>
  );
};
