import React, { FC, useState } from 'react';
import { Box, Image, Badge, Text, useDisclosure } from '@chakra-ui/core';

import { IDrink } from '../types';
import { DrinkModal } from './DrinkModal';
import Heart from '../assets/clear.png';
import Liked from '../assets/liked.png';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_DRINK } from '../graphql';

interface IProps {
  drink: IDrink;
}

export const Drink: FC<IProps> = ({ drink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [liked, setLiked] = useState(false);

  const [likeDrink] = useMutation(LIKE_DRINK);

  return (
    <Box
      onClick={() => onOpen()}
      bg='white'
      maxW='xs'
      height='400px'
      rounded='lg'
      overflow='hidden'>
      <DrinkModal
        isOpen={isOpen}
        onClose={onClose}
        ingredients={drink.ingredients}
        comments={drink.comments}
        name={drink.name}
        recipeId={drink.id}
      />
      <Image height='300px' src={drink.imageUrl} w='100%' objectFit='cover' />
      <Box padding='3'>
        <Box
          display='flex'
          alignItems='baseline'
          justifyContent='space-between'>
          <Badge rounded='full' px='2' variantColor='teal'>
            New
          </Badge>
          <Box
            onClick={(e): any => {
              e.stopPropagation();
              likeDrink({ variables: { recipeId: drink.id } });
              setLiked(true);
            }}>
            <Image
              src={drink.likedByUser || liked ? Liked : Heart}
              alt='heart'
            />
          </Box>
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
