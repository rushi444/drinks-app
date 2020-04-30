import React, { useState, FC } from 'react';
import axios from 'axios';
import { FormContainer } from '../auth/Register';
import { Box, Input, FormControl, Text, Button } from '@chakra-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_RECIPE, GET_DRINKS_QUERY } from '../graphql';
import { useHistory } from 'react-router-dom';
import { IRecipe } from '../types';
import { LoadingPage } from '../utils/LoadingPage';
import styled from '@emotion/styled';

export const CreateRecipe: FC = () => {
  const history = useHistory();
  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE, {
    refetchQueries: [
      { query: GET_DRINKS_QUERY, variables: { first: 12, skip: 0 } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      history.push('/');
    },
  });

  const [newRecipe, setNewRecipe] = useState<IRecipe>({
    name: '',
    imageUrl: '',
    ingredients: [],
  });

  const [newIngredient, setAddNewIngredient] = useState({
    name: '',
    amount: '',
  });

  const [file, setFile] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAddNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  const addIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, newIngredient],
    });
    setAddNewIngredient({
      name: '',
      amount: '',
    });
  };

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 10000000;
    if (selectedFile?.size > fileSizeLimit) {
      console.error(`${selectedFile.name}: File Size Exceeded Limit`);
    } else {
      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('resource_type', 'raw');
      data.append('upload_preset', 'music-cloud');
      data.append('cloud_name', 'rushi44');
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/rushi44/raw/upload',
        data,
      );
      return res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = await handleImageUpload();
    await createRecipe({ variables: { ...newRecipe, imageUrl: url } });
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <FormContainer>
      <Box as='h1' fontSize='3rem'>
        Add a Drink
      </Box>
      <FormControl onSubmit={(e) => handleSubmit(e)}>
        <NameInput
          type='text'
          name='name'
          placeholder='name of drink'
          autoComplete='off'
          value={newRecipe.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Box mb='2%'>
          <Text as='h1' color='purple' fontSize='xl' mt='2%' mb='2%'>
            Ingredients
          </Text>
          {newRecipe?.ingredients.length > 0 &&
            newRecipe?.ingredients.map((ingredient: any, index: number) => (
              <h1 key={index}>
                {ingredient?.amount} {ingredient?.name}
              </h1>
            ))}
          <Box display='flex'>
            <IngredientInput
              w='20%'
              type='text'
              name='amount'
              placeholder='amount'
              value={newIngredient.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleIngredientChange(e)
              }
            />
            <IngredientInput
              w='60%'
              type='text'
              name='name'
              placeholder='ingredient'
              value={newIngredient.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleIngredientChange(e)
              }
            />
            <Button
              w='20%'
              variantColor='purple'
              variant='outline'
              onClick={() => addIngredient()}>
              Add
            </Button>
          </Box>
        </Box>
        <IngredientInput
          id='image'
          isRequired
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
        <Button
          mt='2%'
          variantColor='purple'
          variant='outline'
          onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </FormControl>
    </FormContainer>
  );
};

const NameInput = styled(Input)`
  background: transparent;
  border-bottom: 1px solid purple;
  margin-right: 1%;
  min-width: 400px;
  ::placeholder {
    color: purple;
  }
  :focus {
    ouline: none;
    border-bottom: 2px solid purple;
  }
`;

const IngredientInput = styled(Input)`
  background: transparent;
  border-bottom: 1px solid purple;
  ::placeholder {
    color: purple;
  }
  :focus {
    ouline: none;
    border-bottom: 2px solid purple;
  }
`;
