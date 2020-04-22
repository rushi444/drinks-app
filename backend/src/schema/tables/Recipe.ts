import { objectType } from '@nexus/schema'

export const Recipe = objectType({
    name: 'Recipe',
    description: 'A single Recipe',
    definition: t => {
        t.model.id()
        t.model.name()
        t.model.imageUrl()
        t.model.comments({
            type: 'Comment'
        })
        t.model.ingredients({
            type: 'Ingredient'
        })
        t.model.createdBy()
        t.model.createdAt()

        t.int('numberOfLikes', {
            description: 'number of likes recipe has',
            resolve: async ({ id }, args, { prisma }, info) => {
                const likes = await prisma.like.findMany({
                    where: {
                        recipeId: id
                    }
                })
                return likes.length
            }
        })
    }
})