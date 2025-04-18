import { useDispatch, useSelector } from '@shared';
import { useEffect } from 'react';
import { getBoards } from '../redux/thunks';

export const useBoards = () => {
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

  return { boards, loading, error };
};
