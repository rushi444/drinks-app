import React, { FC } from 'react';
import { Box, List, ListItem } from '@chakra-ui/core';
import { IIngredient } from '../types';

interface IProps {
  ingredients: IIngredient[];
}

export const Ingredients: FC<IProps> = ({ ingredients }) => {
  return (
    <Box>
      <h1>Ingredients</h1>
      <List spacing='1%' padding='1%' styleType='square'>
        {ingredients?.map((ingredient, index) => (
          <ListItem key={index}>
            {ingredient.amount} {ingredient.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
