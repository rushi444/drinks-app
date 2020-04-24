import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Input, Button, Box } from '@chakra-ui/core';

export const Register = () => {
  return (
    <Box width='60%'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log('submit', data);
          setSubmitting(false);
          resetForm();
        }}>
        {({ values, isSubmitting }) => (
          <Form>
            <Field name='name' type='input' placeholder='name' as={Input} />
            <Field name='email' type='input' placeholder='email' as={Input} />
            <Field
              name='password'
              type='input'
              placeholder='password'
              as={Input}
            />
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
