import React, { FC } from 'react';
import { Box, Image, Badge, Text } from '@chakra-ui/core';

import { IDrink } from '../types';

interface IProps {
  drink: IDrink;
}

export const Drink: FC<IProps> = ({ drink }) => {
  console.log(drink);
  return (
    <Box bg='white' maxW='sm' borderWidth='1px' rounded='lg' overflow='hidden'>
      <Image src={drink.imageUrl} />
      <Box padding='3'>
        <Box display='flex' alignItems='baseline'>
          <Badge rounded='full' px='2' variantColor='teal'>
            New
          </Badge>
        </Box>
        <Box
          display='flex'
          mt='1'
          fontWeight='semibold'
          lineHeight='tight'
          fontSize='1.5rem'
          alignItems='baseline'
          justifyContent='space-between'
          isTruncated>
          <Box>{drink.name}</Box>
          <Box fontSize='1rem' display='flex'>
            By:<Text> {drink.createdBy.name}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
