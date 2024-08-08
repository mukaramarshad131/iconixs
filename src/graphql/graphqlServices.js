import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from './query';

const useFetch = () => {
  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  return [mutateFunction, data, loading, error];
};

export default useFetch;
