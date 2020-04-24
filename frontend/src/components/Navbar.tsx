import React, { FC } from 'react';
import { Flex, Image, Text, Grid } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => {
  return (
    <Flex
      bg='white'
      w='100%'
      h='10%'
      px={10}
      py={4}
      justifyContent='space-between'
      alignItems='center'>
      <Flex flexDirection='row' justifyContent='center' alignItems='center'>
        <Image
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsjLsStPiy7ew7BJrvWTzRECcPu96LvnQCQD-243s8BrKCSw7L&usqp=CAU'
          size={50}
        />
        <Text pl={3} color='black' fontSize='4xl'>
          Drinks
        </Text>
      </Flex>
      <Grid color='black' templateColumns='repeat(5, 1fr)'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Sign In</Link>
        <Link to='/register'>Sign Up</Link>
        <Link to='/'>My Drinks</Link>
        <Link to='/'>Liked Drinks</Link>
      </Grid>
    </Flex>
  );
};
