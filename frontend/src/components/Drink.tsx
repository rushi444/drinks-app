import React, { FC } from 'react';
import { Box, Image, Badge, Text, useDisclosure } from '@chakra-ui/core';

import { IDrink } from '../types';
import { DrinkModal } from './DrinkModal';

interface IProps {
  drink: IDrink;
}

export const Drink: FC<IProps> = ({ drink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box onClick={() => onOpen()} bg='white' maxW='xs' height='400px' rounded='lg' overflow='hidden'>
      <DrinkModal isOpen={isOpen} onClose={onClose} ingredients={drink.ingredients} comments={drink.comments} name={drink.name} />
      <Image height='300px' src={drink.imageUrl} />
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
          <Box>{drink.name}{drink.id}</Box>
          <Box fontSize='1rem' display='flex'>
            By:<Text> {drink.createdBy.name}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
