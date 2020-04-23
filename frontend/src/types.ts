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
