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
import { LoadingPage } from '../utils/LoadingPage';
import { Comments } from './Comments';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  drinkId: number;
}

export const DrinkModal: FC<IProps> = ({ isOpen, onClose, drinkId }) => {
  const { data, loading } = useQuery(RECIPE_DETAILS, {
    variables: { id: drinkId },
  });

  if (loading) {
    return <LoadingPage />;
  }

  console.log('MODAL', data);

  const { recipe } = data;

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{recipe.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Ingredients ingredients={recipe.ingredients} />
          <Comments comments={recipe.comments} />
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
