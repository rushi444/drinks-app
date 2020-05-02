import React, { FC } from 'react';
import { Grid } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';

import { IDrink } from '../types';
import { Drink } from './Drink';
import styled from '@emotion/styled';

interface IProps {
  drinks: IDrink[];
  fetchMoreDrinks?: Function;
  shouldRefetch: boolean;
}

export const DrinkList: FC<IProps> = ({
  drinks,
  fetchMoreDrinks,
  shouldRefetch,
}) => {
  return (
    <ContainerGrid templateColumns='repeat(4, 1fr)' px='5%' gridRowGap='1rem'>
      {drinks?.map((drink, index) => (
        <div key={index}>
          <Drink key={drink.id} drink={drink} />
          {shouldRefetch && fetchMoreDrinks && index === drinks.length - 4 && (
            <Waypoint
              onEnter={() =>
                fetchMoreDrinks({
                  variables: {
                    first: 8,
                    skip: drinks.length,
                  },
                  updateQuery: (prev: any, { fetchMoreResult }: any) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      recipes: [...prev.recipes, ...fetchMoreResult.recipes],
                    });
                  },
                })
              }
            />
          )}
        </div>
      ))}
    </ContainerGrid>
  );
};

const ContainerGrid = styled(Grid)`
  @media (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
