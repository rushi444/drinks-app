import React, { FC } from 'react';
import { Box } from '@chakra-ui/core';

import { IDrink } from '../types';

interface IProps {
  drink: IDrink;
}

export const Drink: FC<IProps> = ({ drink }) => {
  console.log(drink);
  return <Box maxW='sm' borderWidth='1px' rounded='lg' overflow='hidden'>
      {drink.name}
  </Box>;
};
