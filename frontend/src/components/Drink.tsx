import React, { FC } from 'react';
import { Box, Image, Badge, Text, useDisclosure } from '@chakra-ui/core';

import { IDrink } from '../types';
import { DrinkModal } from './DrinkModal';

interface IProps {
  drink: IDrink;
}

export const Drink: FC<IProps> = ({ drink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(drink);
  return (
    <Box onClick={() => onOpen()} bg='white' maxW='xs' maxH='md' rounded='lg' overflow='hidden'>
      <DrinkModal isOpen={isOpen} onClose={onClose} drinkId={drink.id} />
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
