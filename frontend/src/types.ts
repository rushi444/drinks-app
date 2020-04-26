interface ICreatedBy {
  name: string
}

export interface IDrink {
  id: number;
  name: string;
  numberOfLikes: number;
  imageUrl: string;
  createdBy: ICreatedBy
  __typename: string;
}

export interface IIngredient {
  id?: number
  name: string
  amount: string
  __typename: string
}

interface ICreatedBy {
  name: string
  __typename: string
}

export interface IComment {
  text: string
  createdBy: ICreatedBy
}