import { useParams } from 'react-router-dom';

export const BoardPage = () => {
  const { id } = useParams();
  return <>Board Page id: {id}</>;
};
