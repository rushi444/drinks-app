import React, { FC, useState } from 'react';
import { Input, Box, Button, Spinner } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_DRINKS } from '../graphql';

interface IProps {
  setSearchResults: Function;
}

export const SearchBar: FC<IProps> = ({ setSearchResults }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const [searchDrinks, { loading }] = useLazyQuery(SEARCH_DRINKS, {
    onCompleted: (data) => setSearchResults(data.search),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchDrinks({ variables: { searchText: searchInput } });
    setSearchInput('');
  };

  return (
    <SearchContainer>
      <SearchInput
        type='text'
        size='lg'
        name='search'
        variant='flushed'
        placeholder='search for drinks or ingredients'
        value={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
      />
      <Button
        onClick={(e) => handleSubmit(e)}
        variantColor='purple'
        size='lg'
        variant='outline'
        type='submit'
        minWidth='60px'>
        {loading ? <Spinner /> : 'Search'}
      </Button>
    </SearchContainer>
  );
};

const SearchInput = styled(Input)`
  background: transparent;
  border-bottom: 1px solid purple;
  margin-right: 1%;
  min-width: 400px;
  width: 40%;
  ::placeholder {
    color: purple;
  }
  :focus {
    ouline: none;
    border-bottom: 2px solid purple;
  }
`;

const SearchContainer = styled(Box)`
  width: 60%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;
