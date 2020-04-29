import React from 'react';
import { DrinkList } from '../components/DrinkList';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_DRINKS } from '../graphql';
import { LoadingPage } from '../utils/LoadingPage';
import { Box } from '@chakra-ui/core';

export const Profile = () => {
  const { data, loading } = useQuery(GET_USER_DRINKS);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box mt='2%'>
      <DrinkList
        drinks={data?.me?.recipes}
        shouldRefetch={false}
      />
    </Box>
  );
};
