import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { SearchBar } from '../components/SearchBar';
import { DrinkList } from '../components/DrinkList';
import { LoadingPage } from '../components/LoadingPage';
import { IDrink } from '../types';

export const Dashboard: FC = () => {
  const [searchResults, setSearchResults] = useState<IDrink[]>([]);

  const { data, loading } = useQuery(GET_DRINKS_QUERY);

  if (loading) return <LoadingPage />

  data && console.log(data.recipes);

  const drinks = searchResults.length > 0 ? searchResults : data.recipes;

  return (
    <div style={{ height: '90%', width: '100%', textAlign: 'center' }}>
      <SearchBar />
      <DrinkList drinks={drinks} />
    </div>
  );
};

const GET_DRINKS_QUERY = gql`
  query {
    recipes {
      id
      name
      numberOfLikes
    }
  }
`;
