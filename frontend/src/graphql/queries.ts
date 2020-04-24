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