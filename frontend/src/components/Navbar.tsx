import React, { FC } from 'react';
import { Flex, Image, Text, Grid, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface IProps {
  loggedIn: boolean;
}

export const Navbar: FC<IProps> = ({ loggedIn }) => {
  return loggedIn ? (
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
          Cocktail Connoisseur
        </Text>
      </Flex>
      <Grid color='black' w='40%' templateColumns='repeat(5, 1fr)'>
        <Link to='/'>Home</Link>
        <Link to='/mydrinks'>My Drinks</Link>
        <Link to='/liked'>Liked Drinks</Link>
        <Link to='/createrecipe'>Add a Drink</Link>
        <Button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>
          Logout
        </Button>
      </Grid>
    </Flex>
  ) : (
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
          Cocktail Connoisseur
        </Text>
      </Flex>
      <Grid color='black' templateColumns='repeat(3, 1fr)'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Sign In</Link>
        <Link to='/register'>Sign Up</Link>
      </Grid>
    </Flex>
  );
};
