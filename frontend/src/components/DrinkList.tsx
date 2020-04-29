import React, { FC } from 'react';
import { Grid } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';

import { IDrink } from '../types';
import { Drink } from './Drink';

interface IProps {
  drinks: IDrink[];
  fetchMoreDrinks: Function;
}

export const DrinkList: FC<IProps> = ({ drinks, fetchMoreDrinks }) => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' px='5%' gridRowGap='1rem'>
      {drinks?.map((drink, index) => (
        <div key={index}>
          <Drink key={drink.id} drink={drink} />
          {index === drinks.length - 4 && (
            <Waypoint
              onEnter={() => fetchMoreDrinks({
                variables: {
                  first: 8,
                  skip: drinks.length,
                },
                updateQuery: (prev: any, {fetchMoreResult}: any) => {
                  if(!fetchMoreResult) return prev
                  return Object.assign({}, prev, {
                    recipes: [...prev.recipes, ...fetchMoreResult.recipes]
                  })
                }
              })}
            />
          )}
        </div>
      ))}
    </Grid>
  );
};
