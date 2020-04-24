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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrinkModal: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gin & Tonic</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Ingredients</Text>
          <Text>Comments</Text>
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
