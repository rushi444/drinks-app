import React from 'react';
import { Spinner } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const LoadingPage = () => {
  return (
    <SpinnerContainer>
      <Spinner size='xl' />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div({
  height: '90%',
  width: '100%',
  textAlign: 'center',
  marginTop: '5%',
});
