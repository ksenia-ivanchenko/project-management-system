import { SearchTasks } from '@features/search-tasks';
import {
  selectSearchedTasks,
  setSearchQuery,
  useDispatch,
  useSelector,
} from '@shared';
import { TasksList } from '@widgets/tasks-list';
import styles from './issues-page.module.scss';
import { CreateNewTaskButton } from '@features/create-new-task';

export const IssuesPage = () => {
  const dispatch = useDispatch();
  const searchTasks = useSelector(selectSearchedTasks);
  const handleSearch = (value: string) => dispatch(setSearchQuery(value));

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchTasks onSearch={handleSearch} />
      </div>
      <TasksList tasks={searchTasks} />
      <div className={styles.button}>
        <CreateNewTaskButton />
      </div>
    </div>
  );
};
