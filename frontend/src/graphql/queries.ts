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
    ingredients {
      amount
      name
    }
    comments {
      text
      createdBy {
        name
      }
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

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
      }
      token
    }
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      name
    }
  }
`;

export const RECIPE_DETAILS = gql`
  query($id: Int) {
    recipe(where: { id: $id }) {
      name
      imageUrl
      ingredients {
        name
        amount
      }
      comments {
        text
        createdBy {
          name
        }
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
mutation($name: String!, $imageUrl: String!, $ingredients: [IngredientInputType!]) {
  createRecipe(name: $name, imageUrl: $imageUrl, ingredients: $ingredients) {
    name
    imageUrl
    ingredients {
      amount
      name
    }
  }
}
`