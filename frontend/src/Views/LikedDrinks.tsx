import React from 'react';
import { Box } from '@chakra-ui/core';
import { DrinkList } from '../components/DrinkList';
import { useQuery } from '@apollo/react-hooks';
import { LoadingPage } from '../utils/LoadingPage';
import { GET_LIKED_DRINKS } from '../graphql';

export const LikedDrinks = () => {
  const { data, loading } = useQuery(GET_LIKED_DRINKS);

  if (loading) {
    return <LoadingPage />;
  }

  console.log(data)
  return (
    <Box mt='2%'>
      <DrinkList drinks={data?.likedDrinks} shouldRefetch={false} />
    </Box>
  );
};
