import { useApiEndpoint } from 'hooks';
import { QUERY_KEY, fetchDAOsQuery } from 'queries';
import { useQuery } from 'react-query';

export const useAllDaosQuery = () => {
  const endpoint = useApiEndpoint({
    path: 'v1/daos',
    params: {
      limit: 150
    },
  });

  return useQuery(
    QUERY_KEY.DAOS,
    async () => {
      const allDaos = await fetchDAOsQuery(endpoint);
      const myDao = allDaos.find(dao => dao.address === 'terra1vmaggjxf4u3ft5upz3e9wuwu9msl34szuept4mpjwtnud4l65eaqvxyh5u');

      if (myDao) {
        return [myDao];
      } else {
        return [];
      }
    },
    {
      refetchOnMount: false,
    }
  );
};
