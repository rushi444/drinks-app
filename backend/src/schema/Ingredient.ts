import { objectType } from '@nexus/schema';

export const Ingredient = objectType({
    name: 'Ingredient',
    description: 'One of many Ingredients for a Recipe',
    definition: t => {
        t.model.id()
        t.model.name()
        t.model.amount()
        t.model.recipeId()
        t.model.recipe()
    }
})