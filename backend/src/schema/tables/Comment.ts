import { objectType } from '@nexus/schema'

export const Comment = objectType({
    name: 'Comment',
    description: 'Comments for recipes, created by users',
    definition: t => {
        t.model.id()
        t.model.recipeId()
        t.model.recipe({
            type: 'Recipe'
        })
        t.model.text()
        t.model.userId()
        t.model.createdBy({
            type: 'User'
        })
    }
})