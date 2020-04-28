import React, { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  ModalFooter,
} from '@chakra-ui/core';
import { Ingredients } from './Ingredients';
import { useQuery } from '@apollo/react-hooks';
import { RECIPE_DETAILS } from '../graphql/queries';
import { Comments } from './Comments';
import { LoadingPage } from '../utils/LoadingPage';
import { IIngredient, IComment } from '../types';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  name: string
  ingredients: IIngredient[]
  comments: IComment[]
}

export const DrinkModal: FC<IProps> = ({ isOpen, onClose, ingredients, comments, name }) => {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Ingredients ingredients={ingredients} />
          <Comments comments={comments} />
        </ModalBody>
        <ModalFooter>
          <Button variantColor='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Add to Liked</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
