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

        t.int('likedIds', {
            description: 'Liked Recipe Ids by user',
            list: true,
            resolve: async (parent, args, { user, prisma }, info) => {
                const liked = await prisma.like.findMany({
                    where: {
                        userId: user.id
                    }
                })
                return liked.map(like => like.recipeId)
            }
        })
    }
})