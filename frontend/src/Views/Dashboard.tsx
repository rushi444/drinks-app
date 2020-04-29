import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SearchBar } from '../components/SearchBar';
import { DrinkList } from '../components/DrinkList';
import { LoadingPage } from '../utils/LoadingPage';
import { GET_DRINKS_QUERY } from '../graphql';
import { IDrink } from '../types';

export const Dashboard: FC = () => {
  const [searchResults, setSearchResults] = useState<IDrink[]>([]);

  const { data, loading, fetchMore } = useQuery(GET_DRINKS_QUERY, {
    variables: { first: 12, skip: 0 },
  });

  if (loading) return <LoadingPage />;

  return (
    <div style={{ height: '90%', width: '100%', textAlign: 'center' }}>
      <SearchBar setSearchResults={setSearchResults} />
      <DrinkList
        fetchMoreDrinks={fetchMore}
        drinks={searchResults.length > 0 ? searchResults : data?.recipes}
      />
    </div>
  );
};
