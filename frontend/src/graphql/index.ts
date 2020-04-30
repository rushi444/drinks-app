import { gql } from 'apollo-boost';

export const GET_DRINKS_QUERY = gql`
  query($first: Int!, $skip: Int!) {
    recipes(orderBy: { id: desc }, first: $first, skip: $skip) {
      id
      name
      numberOfLikes
      likedByUser
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

export const GET_USER_LIKED = gql`
  query {
    me {
      likedIds
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
  mutation(
    $name: String!
    $imageUrl: String!
    $ingredients: [IngredientInputType!]
  ) {
    createRecipe(name: $name, imageUrl: $imageUrl, ingredients: $ingredients) {
      name
      imageUrl
      ingredients {
        name
        amount
      }
    }
  }
`;

export const SEARCH_DRINKS = gql`
  query($searchText: String!) {
    search(searchText: $searchText) {
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

export const GET_USER_DRINKS = gql`
  query {
    me {
      id
      name
      recipes(orderBy: { id: desc }) {
        id
        name
        numberOfLikes
        likedByUser
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
  }
`;

export const GET_LIKED_DRINKS = gql`
  query {
    likedDrinks {
      id
      name
      numberOfLikes
      likedByUser
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

export const LIKE_DRINK = gql`
  mutation($recipeId: Int!) {
    createLike(recipeId: $recipeId) {
      likedBy {
        name
      }
      recipe {
        name
      }
    }
  }
`;
