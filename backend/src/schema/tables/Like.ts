import { objectType } from '@nexus/schema'

export const Like = objectType({
    name: 'Like',
    description: 'Users can like recipes',
    definition: t => {
        t.model.id()
        t.model.userId()
        t.model.recipeId()
        t.model.likedBy()
        t.model.recipe()
    }
})