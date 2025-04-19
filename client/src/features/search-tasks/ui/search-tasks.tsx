import { Input } from 'antd';
import { debounce } from 'lodash';
import { ChangeEvent, useMemo } from 'react';

type SearchTasksProps = {
  onSearch: (value: string) => void;
};

export const SearchTasks = ({ onSearch }: SearchTasksProps) => {
  const debouncedSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value.trim().toLowerCase());
      }, 300),
    [onSearch]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    debouncedSearch(e);
  };

  return <Input placeholder="Поиск" onChange={handleChange} />;
};
