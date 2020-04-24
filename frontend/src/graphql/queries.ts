import { gql } from 'apollo-boost';

export const GET_DRINKS_QUERY = gql`
  query {
    recipes {
      id
      name
      numberOfLikes
      imageUrl
      createdBy {
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;
