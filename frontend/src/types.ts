interface ICreatedBy {
  name: string
}

export interface IDrink {
  id: number;
  name: string;
  numberOfLikes: number;
  imageUrl: string;
  likedByUser: boolean;
  createdBy: ICreatedBy
  ingredients: IIngredient[]
  comments: IComment[]
  // __typename?: string;
}

export interface IRecipe {
  name: string
  imageUrl: string
  ingredients: IIngredient[]
}

export interface IIngredient {
  id?: number
  name: string
  amount: string
  // __typename?: string
}

interface ICreatedBy {
  name: string
  // __typename?: string
}

export interface IComment {
  text: string
  createdBy: ICreatedBy
}