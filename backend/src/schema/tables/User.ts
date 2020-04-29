import { objectType } from '@nexus/schema'

export const User = objectType({
    name: 'User',
    description: 'Single User for cocktail-app',
    definition: t => {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.recipes({
            type: 'Recipe', ordering: true
        })
        t.model.comments({
            type: 'Comment'
        })
        t.model.likedRecipes({
            type: 'Like'
        })
    }
})