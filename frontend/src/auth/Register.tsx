import React, { FC } from 'react';
import { Formik, Field, Form, useField, FieldAttributes } from 'formik';
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import {
  validateName,
  validateEmail,
  validatePassword,
} from './FormValidation';
import { LoadingPage } from '../components/LoadingPage';

export const Register = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onError: () => null,
    onCompleted: () => console.log('user created'),
  });

  if (loading) return <LoadingPage />;

  return (
    <Box width='60%'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          createUser({ variables: { ...data } });
          setSubmitting(false);
          resetForm();
        }}>
        {({ values, isSubmitting }) => (
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
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
                  <FormLabel htmlFor='password'>Name</FormLabel>
                  <Input {...field} id='password' placeholder='password' />
                  <FormErrorMessage>{form?.errors?.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type='submit' isDisabled={isSubmitting}>
              Submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;
