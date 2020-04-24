import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/core';
import { useMutation } from '@apollo/react-hooks';
import {
  validateName,
  validateEmail,
  validatePassword,
} from './FormValidation';
import { LoadingPage } from '../utils/LoadingPage';
import { CREATE_USER } from '../graphql/queries';
import styled from '@emotion/styled';

export const Register: FC = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: () => null,
    onCompleted: () => console.log('user created'),
  });

  if (loading) return <LoadingPage />;

  return (
    <RegisterContainer>
      <Box as='h1' fontSize='3rem' mb='3%'>
        Register
      </Box>
      <Box>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            createUser({ variables: { ...data } });
            setSubmitting(false);
            resetForm();
          }}>
          {({ values, isSubmitting }) => (
            <Form style={{ margin: '0 auto' }}>
              <Field name='name' validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input {...field} id='name' placeholder='name' />
                    <FormErrorMessage>{form?.errors?.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='email' validate={validateEmail}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{form?.errors?.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password' validate={validatePassword}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input {...field} id='password' placeholder='password' />
                    <FormErrorMessage>
                      {form?.errors?.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt='1.5%'
                variantColor='purple'
                variant='outline'
                type='submit'
                isDisabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div({
  width: '40%',
  textAlign: 'center',
  margin: '0 auto',
  marginTop: '1%',
});
