import React, { FC } from 'react';
import { Grid } from '@chakra-ui/core';

import { IDrink } from '../types';
import { Drink } from './Drink';

interface IProps {
  drinks: IDrink[];
}

export const DrinkList: FC<IProps> = ({ drinks }) => {
  console.log('drinklist', drinks);

  return (
    <Grid templateColumns='repeat(4, 1fr)'>
      {drinks.map((drink) => (
        <Drink key={drink.id} drink={drink} />
      ))}
    </Grid>
  );
};
