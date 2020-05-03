import React, { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql';
import { LoadingPage } from '../utils/LoadingPage';
import { FormContainer } from './Register';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Spinner,
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';
import { validateEmail, validatePasswordLogin } from './FormValidation';
import { useHistory } from 'react-router-dom';

interface IProps {
  setLoggedIn: Function;
}

export const Login: FC<IProps> = ({ setLoggedIn }) => {
  const history = useHistory();
  const [login, { loading, client }] = useMutation(LOGIN, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      client?.writeData({
        data: { isLoggedIn: !!localStorage.getItem('token') },
      });
      setLoggedIn(true);
      history.push('/');
    },
  });

  if (loading) return <LoadingPage />;

  return (
    <FormContainer>
      <Box as='h1' fontSize='3rem' mb='3%'>
        Login
      </Box>
      <Box>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(data) => {
            login({ variables: { ...data } });
          }}>
          {({ isSubmitting }) => (
            <Form style={{ margin: '0 auto' }}>
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
              <Field name='password' validate={validatePasswordLogin}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                      {...field}
                      type='password'
                      id='password'
                      placeholder='password'
                    />
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
                {isSubmitting ? <Spinner /> : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </FormContainer>
  );
};
