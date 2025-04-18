import { useDispatch, useSelector } from '@shared';
import { useEffect } from 'react';
import { getUsers } from '../redux/thunks';

export const useUsers = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, []);

  return { users, loading, error };
};
