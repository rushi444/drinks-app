import { mutationType, intArg, stringArg } from '@nexus/schema'

export const Mutation = mutationType({
    definition: t => {
        t.crud.createOneUser()
        t.field('createRecipe', {
            type: 'Recipe',
            args: {
                name: stringArg({ required: true }),
                imageUrl: stringArg(),
                userId: intArg({ required: true })
            },
            resolve: async (parent, { name, imageUrl, userId }, context, info) => {
                const newRecipe = await context.prisma.recipe.create({
                    data: {
                        name, imageUrl, createdBy: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })
                return newRecipe
            }
        })
    }

})